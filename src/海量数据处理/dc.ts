const fs = require('fs');
const path = require('path')

// Step 1: Divide the file into smaller partitions based on order amounts
function partitionFile(inputFilePath, outputDirPath, callback) {
    const partitions = {};

    // Read the input file sequentially
    const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });

    readStream.on('data', (chunk) => {
        const orders = chunk.split('\n');
        orders.forEach((order) => {
            // Extract the order amount from the order entry
            const amount = parseFloat(order.split(',')[1]);

            // Determine the partition for the order based on its amount
            const partition = Math.floor(amount / 100);

            // Create a writable stream for the partition file if it doesn't exist
            if (!partitions.hasOwnProperty(partition)) {
                const partitionFilePath = `${outputDirPath}/partition_${partition}.txt`;
                partitions[partition] = fs.createWriteStream(partitionFilePath, { flags: 'a' });
            }

            // Write the order to the appropriate partition file
            partitions[partition].write(`${order}\n`);
        });
    });

    readStream.on('end', () => {
        // Close all partition files
        for (const partition in partitions) {
            partitions[partition].end();
        }

        callback();
    });
}

// Step 2: Sort each partition individually
function sortPartitions(inputDirPath, outputDirPath, callback) {
    fs.readdir(inputDirPath, (err, files) => {
        if (err) {
            throw err;
        }

        files.forEach((file) => {
            const filePath = `${inputDirPath}/${file}`;
            const sortedFilePath = `${outputDirPath}/sorted_${file}`;
            // Read the orders from the partition file
            const orders = fs.readFileSync(filePath, { encoding: 'utf8' }).split('\n');

            // Sort the orders using an efficient algorithm (e.g., merge sort)
            const sortedOrders = orders.sort((a, b) => {
                const amountA = parseFloat(a.split(',')[1]);
                const amountB = parseFloat(b.split(',')[1]);
                return amountA - amountB;
            });

            // Write the sorted orders to the sorted partition file
            fs.writeFileSync(sortedFilePath, sortedOrders.join('\n'), { encoding: 'utf8' });
        });

        callback();
    });
}

// Step 3: Merge the sorted partitions
function mergePartitions(inputDirPath, outputFilePath) {


    // Step 1: Perform merge sort on an array of numbers
    function mergeSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        return merge(mergeSort(left), mergeSort(right));
    }

    // Step 2: Merge two sorted arrays
    function merge(left, right) {
        let merged = [];
        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
            // 读取文件标题后面的数字
            if (parseFloat(left[i].split(',')[1]) <= parseFloat(right[j].split(',')[1])) {
                merged.push(left[i]);
                i++;
            } else {
                merged.push(right[j]);
                j++;
            }
        }

        while (i < left.length) {
            merged.push(left[i]);
            i++;
        }

        while (j < right.length) {
            merged.push(right[j]);
            j++;
        }

        return merged;
    }

    const filePointers = [];
    let mergedOutput = '';

    fs.readdir(inputDirPath, (err, files) => {
        if (err) {
            throw err;
        }

        // Open all sorted partition files and initialize file pointers
        files.forEach((file) => {
            const filePath = path.join(inputDirPath, file);
            const fileData = fs.readFileSync(filePath, 'utf8').trim();
            const partitionData = fileData.split('\n');
            filePointers.push(partitionData);
        });

        // Merge the sorted partitions
        const sortedOutput = mergeSort(filePointers.flat());

        // Format the sorted output
        mergedOutput = sortedOutput.join('\n') + '\n';

        // Write the merged output to the final sorted file
        fs.writeFileSync(outputFilePath, mergedOutput, { encoding: 'utf8' });

        // Delete the temporary partition files
        // files.forEach((file) => {
        //     const filePath = path.join(inputDirPath, file);
        //     fs.unlinkSync(filePath);
        // });
    });
}


// Entry point
function sortLargeOrderFile(inputFilePath, outputFilePath) {
    const inputDirPath = './temp/input';
    const outputDirPath = './temp/output';

    // Create temporary directories if they don't exist
    if (!fs.existsSync('./temp')) {
        fs.mkdirSync('./temp');
    }
    if (!fs.existsSync(inputDirPath)) {
        fs.mkdirSync(inputDirPath);
    }
    if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath);
    }

    partitionFile(inputFilePath, inputDirPath, () => {
        sortPartitions(inputDirPath, outputDirPath, () => {
            mergePartitions(outputDirPath, outputFilePath);
        });
    });
}

// Usage
const inputFilePath = './input_file.txt';
const outputFilePath = './sorted_file.txt';

sortLargeOrderFile(inputFilePath, outputFilePath);
