const mergeSort = (data, p, r) => {
    // 如果只剩一个元素，结束循环
    if(p >= r) return;
    // 暂且以中间为分割
    let q = Math.floor((p + r) / 2);
    // 分解
    mergeSort(data, p, q)
    mergeSort(data, q + 1, r)
    // 合并
    merge(data, p, q, r)
}

const merge = (data, p, q, r) => {
    const temp = new Array(r-p+1);
    let i = p;
    let j = q+1;
    let k = 0;
    while(i<=q &&  j <= r) {
        if(data[i] <= data[j]) {
            temp[k++] = data[i++]
        }
        else {
            temp[k++] =data[j++]
        }
    }

    // 判断哪个数组中有剩余数据
    let start = i;
    let end = r;
    if(j>r) {
        end = q
    }
    else {
        start = j
    }

    while(start <= end) {
        temp[k++] = data[start++]
    }

    // 将temp复制回去
    for(let i=0;i<r-p+1; i++) {
        data[p+i] = temp[i]
    }
    return data;
}

export const ms_test_function = () => {
    const data = [11,8,3,9,7,1,2,3]
    mergeSort(data, 0, data.length - 1)
    return true;
}