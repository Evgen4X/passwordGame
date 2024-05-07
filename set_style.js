function rnd_color() {
    const possible = "1234567890abcdef"
    let ans, flag = false;
    do {
        ans = "#"
        for (let i = 0; i < 6; i++) {
            ans += possible[Math.floor(Math.random() * 16)];
            if (i > 1 && ans[i] == ans[i - 1] && ans[i] == ans[i - 2]) {
                flag = true;
                break;
            }
        }
    } while (flag);
    return ans;
}

let a = rnd_color();
document.getElementById("box").style.backgroundColor = a;