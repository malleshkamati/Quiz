const arr1=[5,4,1];

arr1['hi']=6
for (const i of arr1) {
    console.log(i);
    
}

// for (const i in arr1) {
//     if (Object.hasOwnProperty.call(arr1, i)) {
//         const element =arr1[i];
//         console.log(element);
        
//     }
// }

// arr2=arr1.forEach(element => {
//     element*=2
//     console.log(element);
    
// });
// console.log(arr2);
// console.log(arr1);