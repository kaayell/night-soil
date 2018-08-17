import _ from "lodash";

export const RATING_COLORS = {
  '1': '#d7ccc8',
  '2': '#a1887f',
  '3': '#8d6e63',
  '4': '#6d4c41',
  '5': '#4e342e'
}

export const pieData = (poopData) => {
  let grouped = _.groupBy(poopData, 'poopRating')
  return _.map(grouped, (groupValue, groupKey) => {
    return {
      value: groupValue.length,
      svg: {
        fill: RATING_COLORS[groupKey]
      },
      key: RATING_COLORS[groupKey],
    }
  })
}
