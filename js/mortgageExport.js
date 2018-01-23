
export let calculateMonthlyPayment = (principal, years, rate) => {
    let monthlyRate = 0;
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));

    return {principal,years,rate, monthlyPayment,monthlyRate}
};

export let calculationAmortisation = (principal, years, rate) => {
    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal,years,rate);
    let balance = principal;
    let amortisation = [];
    for (let year=0;year<years;year++){
        let interestYear = 0;
        let principalYear = 0;
        for (let month=0; month<12;month++){
            let interestMonth = balance * monthlyRate;
            let principalMonth = monthlyPayment - interestMonth;
            interestYear = interestYear + interestMonth;
            principalYear = principalYear + principalMonth;
            balance = balance - principalMonth;
        }
        amortisation.push({principalYear,interestYear,balance});
    }
    return {monthlyPayment,monthlyRate,amortisation};
}