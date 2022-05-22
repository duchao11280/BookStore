/**
 * Another utilities
 * Create by: ThangLD
 * Create at: 14/05/2022
 */

export function groupArrayByKey(array, key) {
    return array.reduce((group, element) => {
        group[element[key]] = [...group[element[key]] || [], element];
        return group;
    }, {})
}