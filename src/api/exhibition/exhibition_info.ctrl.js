const exhibitionData = require('../../db/model/exhibitionData')
const preferenceData = require('../../db/model/preference')
const reviewData = require('../../db/model/review')
const dbPool = require('../../../config/connection')
const dbConnection = require('../../lib/dbConnection')
const preCompare = require('../../moduels/preCompare')
const decodeTokenFunc = require('../../lib/token')

exports.getExInfo = async (req, res) => {
    let exDetailDataResult, exAuthorDataResult, exUserLikeResult, exUserGradeResult, preferenceDataResult, likeflag, user_review_grade
    let uGenre, uMood, uPlace, uSubject
    let eGenre, eMood, ePlace, eSubject
    let selected = [], unSelected = []
    try {
        //*****************************************************************
        //토큰 사용시
        const { user_token } = req.headers
        const decodedTokenResult = await decodeTokenFunc.decodedToken(user_token, req.app.get('jwt-secret'))
        const userId = decodedTokenResult.userID
        //******************************************************************
        connection = await dbConnection(dbPool)

        exDetailDataResult = await exhibitionData.getExDetailInfo(req.params.exId, connection)
        exAuthorDataResult = await exhibitionData.getExAuthorInfo(exDetailDataResult[0].author_id, connection)
        exUserLikeResult = await exhibitionData.getUserExLikeInfo(req.params.exId, userId, connection)
        exUserGradeResult = await exhibitionData.getUserReviewGrade(req.params.exId, userId, connection)
        preferenceDataResult = await preferenceData.getPreferenceInfo(userId, connection)

        if (exUserLikeResult) {
            likeflag = 1
        } else likeflag = 0

        if (exUserGradeResult.length === 0) {
            user_review_grade = 0
        } else user_review_grade = exUserGradeResult[0].review_grade

        eGenre = exDetailDataResult[0].ex_hash_genre.split(",")
        eMood = exDetailDataResult[0].ex_hash_mood.split(",")
        ePlace = exDetailDataResult[0].ex_hash_place.split(",")
        eSubject = exDetailDataResult[0].ex_hash_subject.split(",")

        ///////만약 사용자가 선택한 취향이 없을 경우 생각하기
        if (preferenceDataResult.length === 0) {
            unSelected = eGenre.concat(eMood).concat(ePlace).concat(eSubject);
        } else {
            uGenre = preferenceDataResult[0].pre_genre.split(",")
            uMood = preferenceDataResult[0].pre_mood.split(",")
            uPlace = preferenceDataResult[0].pre_place.split(",")
            uSubject = preferenceDataResult[0].pre_subject.split(",")

            let preCompareResult = preCompare(eGenre, uGenre, selected, unSelected)
            selected = preCompareResult.selected
            unSelected = preCompareResult.unSelected
            preCompareResult = preCompare(eMood, uMood, selected, unSelected)
            selected = preCompareResult.selected
            unSelected = preCompareResult.unSelected
            preCompareResult = preCompare(ePlace, uPlace, selected, unSelected)
            selected = preCompareResult.selected
            unSelected = preCompareResult.unSelected
            preCompareResult = preCompare(eSubject, uSubject, selected, unSelected)
            selected = preCompareResult.selected
            unSelected = preCompareResult.unSelected
        }

    } catch (e) {
        connection.release()
        res.status(500).send({
            status: "fail",
            code: 3001,
            message: e
        })
    }
    connection.release()
    res.status(200).send({
        status: "success",
        code: 3000,
        message: "successfully load exhibiton detail data",
        data: {
            userInfo: {
                likeFlag: likeflag,
                grade: user_review_grade
            },
            exhibition: {
                average_grade: exDetailDataResult[0].ex_average_grade,
                content: exDetailDataResult[0].ex_content
            },
            selectedHashtag: selected,
            unSelectedHashtag: unSelected,
            authorResult: {
                author_image: exAuthorDataResult[0].author_profile,
                author_content: exAuthorDataResult[0].author_content
            }
        }
    })
}





exports.getExReview = async (req, res) => {
    let averageGradeResult, exReviewDataResult, totalGradeCount, groupGradeCount
    let g_1 = 0, g_2 = 0, g_3 = 0, g_4 = 0, g_5 = 0
    try {
        connection = await dbConnection(dbPool)
        //전시에 대한 평균평점, 리뷰 최신순 3개, 총 참여 인원 수, 별점 별 인원 수
        averageGradeResult = await exhibitionData.getExScore(req.params.exId, connection)
        exReviewDataResult = await reviewData.getExReviewLimit3(req.params.exId, connection)
        totalGradeCount = await reviewData.getTotalReviewCount(req.params.exId, connection)
        groupGradeCount = await reviewData.getGroupGradeCount(req.params.exId, connection)

        for (var i in groupGradeCount) {
            switch (groupGradeCount[i].review_grade) {
                case 1:
                    g_1 = groupGradeCount[i].count
                    break;
                case 2:
                    g_2 = groupGradeCount[i].count
                    break;
                case 3:
                    g_3 = groupGradeCount[i].count
                    break;
                case 4:
                    g_4 = groupGradeCount[i].count
                    break;
                case 5:
                    g_5 = groupGradeCount[i].count
                    break;
            }
        }


    } catch (e) {
        connection.release()
        res.status(500).send({
            status: "fail",
            code: 3004,
            message: e
        })
    }
    connection.release()
    res.status(200).send({
        status: "success",
        code: 3000,
        message: "successfully load review detail data",
        data: {
            reviewGraph: {
                averageGrade: averageGradeResult.grade,
                totalGradeCount: totalGradeCount.grade_count,
                grade_1: g_1,
                grade_2: g_2,
                grade_3: g_3,
                grade_4: g_4,
                grade_5: g_5,
            },
            latestReview: exReviewDataResult
        }
    })
}