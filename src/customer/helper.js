/**
 * Reward logic for on specific amount
 */
const rewardLogic = {
    50: (price) => price > 100 ? 50 : (price > 50 ? price - 50 : 0),
    100: (price) => price > 100 ? (price - 100) * 2 : 0
}

/**
 * Get Rewards & updated trsnactions
 * @param {*} transactions 
 * @returns 
 */
export const getRewards = (transactions) => {
    let totalReward = 0;

    transactions.map((item) => {
        let reward = 0;
        reward += rewardLogic[50](item.amount);
        reward += rewardLogic[100](item.amount);
        item.reward = reward
        totalReward += reward

        return item;
    });

    return { transactions: transactions, totalReward: totalReward }
}

/**
 * Get full name
 * @param {*} firstName 
 * @param {*} LastName 
 * @returns 
 */
export const getFullName = (firstName, LastName) => {
    const first = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const last = LastName.charAt(0).toUpperCase() + LastName.slice(1);
    const fullName = `${first} ${last}`;
    return fullName
}