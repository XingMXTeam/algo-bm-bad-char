/**
 * 双11凑单问题
 * @param items  商品价格
 * @param n 商品个数
 * @param w 凑单金额
 */
function double11advance(items, n, w) {
    let states = new Array(n); // 初始化状态表
    for (let i = 0; i < n; i++) {
        states[i] = new Array(3 * w + 1).fill(false);
    }

    states[0][0] = true; // 首先第一次决策
    if (items[0] <= 3 * w) {
        states[0][items[0]] = true;
    }

    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= 3 * w; j++) { // 不选择
            if (states[i - 1][j] === true) {
                states[i][j] = states[i - 1][j]; // 状态保持不变和上一次一样
            }
        }
        for (let j = 0; j <= 3 * w - items[i]; j++) { // 选择
            if (states[i - 1][j] === true) {
                states[i][j + items[i]] = true; // 标记该点位为已决策
            }
        }
    }

    let j;
    for (j = w; j < 3 * w + 1; j++) { // 找到最接近200的决策价格
        if (states[n - 1][j] === true) {
            break;
        }
    }

    if (j === 3 * w + 1) { // 找不到这样的组合
        return;
    }

    for (let i = n - 1; i >= 1; i--) { // 从第一个商品开始
        // 从n个商品中检测，如果上一个标记点位[i-1, j-items[i]]标记是1表示是选择了该商品
        if (j - items[i] > 0 && states[i - 1][j - items[i]] === true) {
            console.log(items[i] + " ");// 打印已选商品
            j = j - items[i];
        }
    }

    if (j !== 0) { // 如果还有钱剩余，表示第一个商品也选了。
        console.log(items[0]);
    }
}

export const dy_test_function = () => {
    // 从这些商品里面选择，金额刚好能凑到10元来满减
    const items = [2,2,4,6,3]

    double11advance(items, items.length, 10)
    return true
}