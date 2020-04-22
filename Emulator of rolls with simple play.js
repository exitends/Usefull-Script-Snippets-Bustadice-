
async function makeRun(games, bet_bits = 1, target = 2, balance_bits = 1000, interval_ms = 20){
    const c = (...args) => ({
        black: `\x1b[30m${args.join(' ')}`,
        red: `\x1b[31m${args.join(' ')}`,
        green: `\x1b[32m${args.join(' ')}`,
        blue: `\x1b[34m${args.join(' ')}`,
        bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
      });
          
    var wins = 0, loses = 0, cbet = bet_bits * 100, ctarget = target, cprofit = 0, cbalance = Math.round(balance_bits * 100), current_nonce = 0;
    var predeterminated_numbers = await makeResults(games), rolls = 1;

    async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

    async function makeResults(num){
        let results = [];
        for(let i = 0; i < num; i++){
            results.push(Math.max(1, Math.min(1e6, Math.round((0.99 / Math.random()) * 100) / 100)));
        }
        return results;
    }
    
    function getResultFromNonce(nonce){
        return predeterminated_numbers[nonce]
    }
    function nextRoll(){
        current_nonce++;
        rolls++;
        return predeterminated_numbers[current_nonce];
    }

    for (let i = 0; i < predeterminated_numbers.length - 1; i++){
        
        var multiplier = nextRoll();
        
        if (multiplier >= target){
            console.log(c(c("Roll:").black, c(rolls).black, c("|").black, c("Wager:").black, c(cbet / 100).black, c("bits | Target:").black, c(ctarget).black, c("| Outcome:").black, c(multiplier).black, c("|").black, c('Profit:').green, c(Math.round(cbet * (ctarget - 1) / 100)).green, c("bits").green).bgWhite);
            wins++;
            cprofit += cbet * (ctarget - 1);
            cbalance += cbet * (ctarget - 1);
        } else {
            console.log(c(c("Roll:").black, c(rolls).black, c("|").black, c("Wager:").black, c(cbet / 100).black, c("bits | Target:").black, c(ctarget).black, c("| Outcome:").black, c(multiplier).black, c("|").black, c('Loss:').red, c(Math.round(cbet / 100)).red, c("bits").red).bgWhite);
            cprofit -= cbet;
            cbalance -= cbet;
            loses++;
        }
        
        if (cprofit > 0) {
            console.log(c(c('Wins:').black, c(wins).green, c("|").black, c("Loses:").black, c(loses).red, c("|").black, c("Profit:").black, c(Math.round(cprofit / 100)).green, c("bits").black).bgWhite);
            if (cbalance > 0) {console.log(c(c('Balance:').black, c(cbalance / 100).blue, c("bits").black).bgWhite);} else { console.log(`Game over, you have lost.`); break;}
        } else {
            console.log(c(c('Wins:').black, c(wins).green, c("|").black, c("Loses:").black, c(loses).red, c("|").black, c("Profit:").black, c(Math.round(cprofit / 100)).red, c("bits").black).bgWhite);
            if (cbalance > 0) {console.log(c(c('Balance:').black, c(cbalance / 100).blue, c("bits").black).bgWhite);} else { console.log(`Game over, you have lost.`); break;}
        }
        await sleep(interval_ms);
    }
    let s = `Balance: ${cbalance / 100} bits`;
    return s;
}
// USAGE in console:
//     games, bet, target, balance, interval in ms
await makeRun(3000, 10, 15, 5000, 1); /* Emulate game rolls */
