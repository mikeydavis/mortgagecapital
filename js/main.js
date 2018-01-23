
import * as mortgage from './mortgage';
import Mortgage from './mortgage2';

document.getElementById('calcBtn').addEventListener('click', () => {
    let principal = document.getElementById("principal").value;
    let years = document.getElementById("years").value;
    let rate = document.getElementById("rate").value;
    //let monthlyPayment = calculateMonthlyPayment(principal, years, rate);
    //let {monthlyPayment, monthlyRate} = calculateMonthlyPayment(principal,years,rate);
    //let {monthlyPayment,monthlyRate,amortisation} = mortgage.calculationAmortisation(principal,years,rate);

    let {monthlyPayment, monthlyRate, amortization} = 
    mortgage.calculateAmortization(principal, years, rate);

    //let mortgage = new Mortgage();

    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
    let html = "";

    amortization.forEach((year,index) => html += `
        <tr>
            <td>${index + 1}</td>
            <td class="currency">${Math.round(year.principal)}</td>
            <td class="stretch">
            <div class="flex">
                <div class="bar principal"
                         style="flex:${year.principalY};-webkit-flex:${year.principalY}">
                    </div>
                    <div class="bar interest"
                         style="flex:${year.interestY};-webkit-flex:${year.interestY}">
                    </div>
                </div>
            </td>
            <td class="currency left">${Math.round(year.interestY)}</td>
            <td class="currency">${Math.round(year.balance)}</td>
        </tr>
    `);
    document.getElementById("amortization").innerHTML = html;
    //amortization.forEach(month => console.log(month));
});


