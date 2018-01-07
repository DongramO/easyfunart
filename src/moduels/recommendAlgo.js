module.exports = function recommendAlgorithm(exHashArray, userHash) {
    let matchCount = []
    userHash.pre_place = JSON.parse(userHash.pre_place)
    userHash.pre_mood = JSON.parse(userHash.pre_mood)
    userHash.pre_genre = JSON.parse(userHash.pre_genre)
    userHash.pre_subject = JSON.parse(userHash.pre_subject)
    
    for (var i = 0; i < exHashArray.length; i++) {
        matchCount.push({ count: 0, exInfo: exHashArray[i]})
    
        exHashArray[i].ex_hash_place = JSON.parse(exHashArray[i].ex_hash_place)
        exHashArray[i].ex_hash_mood = JSON.parse(exHashArray[i].ex_hash_mood)
        exHashArray[i].ex_hash_genre = JSON.parse(exHashArray[i].ex_hash_genre)
        exHashArray[i].ex_hash_subject = JSON.parse(exHashArray[i].ex_hash_subject)

        for (let key in exHashArray[i].ex_hash_place) {
            if ((exHashArray[i].ex_hash_place[key] === 1) && (userHash.pre_place[key] === 1)) {
                matchCount[i].count = matchCount[i].count + 1
            }
        }

        for (let key in exHashArray[i].ex_hash_mood) {
            if ((exHashArray[i].ex_hash_mood[key] === 1) && (userHash.pre_mood[key] === 1)) {
                matchCount[i].count = matchCount[i].count + 1
            }
        }

        for (let key in exHashArray[i].ex_hash_genre) {
            if ((exHashArray[i].ex_hash_genre[key] === 1) && (userHash.pre_genre[key] === 1)) {
                matchCount[i].count = matchCount[i].count + 1
            }
        }

        for (let key in exHashArray[i].ex_hash_subject) {
            if ((exHashArray[i].ex_hash_subject[key] === 1) && (userHash.pre_subject[key] === 1)) {
                matchCount[i].count = matchCount[i].count + 1
            }
        }
    }

    matchCount.sort(function (a, b) {
        return a.count < b.count ? -1 : 1;
    });
    matchCount.reverse();

    return matchCount
}