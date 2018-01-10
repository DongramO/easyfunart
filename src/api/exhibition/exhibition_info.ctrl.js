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
        exUserLikeResult = await exhibitionData.getUserExLikeInfo(req.params.exId, userId, connection)
        exUserGradeResult = await exhibitionData.getUserReviewGrade(req.params.exId, userId, connection)
        preferenceDataResult = await preferenceData.getPreferenceInfo(userId, connection)

        if (exUserLikeResult) {
            likeflag = 1
        } else likeflag = 0

        if (exUserGradeResult.length === 0) {
            user_review_grade = 0
        } else user_review_grade = exUserGradeResult[0].review_grade

        eGenre = JSON.parse(exDetailDataResult[0].ex_hash_genre)
        eMood = JSON.parse(exDetailDataResult[0].ex_hash_mood)
        ePlace = JSON.parse(exDetailDataResult[0].ex_hash_place)
        eSubject = JSON.parse(exDetailDataResult[0].ex_hash_subject)

        //사실상 있을 수가 없음 preferenceDataResult의 length가 0인 회원이 없음
        if (preferenceDataResult.length === 0) {
            // unSelected = eGenre.concat(eMood).concat(ePlace).concat(eSubject);
            for(let key in eGenre) {
                unSelected.push(key)
            }
            for(let key in eMood) {
                unSelected.push(key)
            }
            for(let key in ePlace) {
                unSelected.push(key)
            }
            for(let key in eSubject) {
                unSelected.push(key)
            }
        } else {
            uGenre = JSON.parse(preferenceDataResult[0].pre_genre)
            uMood = JSON.parse(preferenceDataResult[0].pre_mood)
            uPlace = JSON.parse(preferenceDataResult[0].pre_place)
            uSubject = JSON.parse(preferenceDataResult[0].pre_subject)

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
        console.log(e)
        connection.release()
        res.status(500).send({
            status: "fail",
            code: 4001,
            message: e
        })
        return
    }
    connection.release()
    res.status(200).send({
        status: "success",
        code: 4000,
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
                author_name : exDetailDataResult[0].ex_author_name,
                author_image: exDetailDataResult[0].ex_author_profile,
                author_content: exDetailDataResult[0].ex_author_content
            }
        }
    })
}



///getTotalReviewCount 메소드 쿼리문 바꿈
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

        ////////////////이거 형 확인하기
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
            code: 4003,
            message: e
        })
    }
    connection.release()
    res.status(200).send({
        status: "success",
        code: 4000,
        message: "successfully load review detail data",
        data: {
            reviewGraph: {
                averageGrade: averageGradeResult.grade,
                totalGradeCount: totalGradeCount.grade_count,
                grade_1: g_1,
                grade_2: g_2,
                grade_3: g_3,
                grade_4: g_4,
                grade_5: g_5
            },
            latestReview: exReviewDataResult
        }
    })
}