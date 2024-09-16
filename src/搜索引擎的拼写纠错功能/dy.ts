function lwstDP(a, n, b, m) {
    const minDist = new Array(n + 1);
    for (let i = 0; i < n + 1; i++) {
        minDist[i] = new Array(m + 1);
        minDist[i][0] = i;
    }

    for (let j = 0; j < m + 1; j++) {
        minDist[0][j] = j;
    }

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < m + 1; j++) {
            if (a[i - 1] === b[j - 1]) {
                minDist[i][j] = minOfThree(
                    minDist[i - 1][j] + 1,
                    minDist[i][j - 1] + 1,
                    minDist[i - 1][j - 1]
                );
            } else {
                minDist[i][j] = minOfThree(
                    minDist[i - 1][j] + 1,
                    minDist[i][j - 1] + 1,
                    minDist[i - 1][j - 1] + 1
                );
            }
        }
    }

    return minDist[n][m];
}

function minOfThree(n1, n2, n3) {
    return Math.min(n1, Math.min(n2, n3));
}
