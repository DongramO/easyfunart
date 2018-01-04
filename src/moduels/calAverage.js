
module.exports = function calaverage(count, averageScore, currentScore) {
  const totalScore = averageScore * Number(count)
  const renewScore = parseFloat((totalScore + Number(currentScore)) / (count + 1))
  return renewScore
}
