const values = document.querySelector("#input-value");
const headPosition = document.querySelector("#head-position");
const button = document.querySelector(".calculate");
const displaySeq = document.querySelector(".sequence-solution");
const displayTotal = document.querySelector(".movement-solution");
const selectType = document.querySelector(".select-type");
const warning = document.querySelector(".warning");
const reset = document.querySelector(".reset");
const toggleSection = document.querySelector(".toggle-section");
const toggleDirection = document.querySelector(".toggle-direction");
const ctx = document.getElementById('myChart').getContext('2d');

button.addEventListener("click", function(event) {
    event.preventDefault();

    toggleSection.style.display = "block";

    if (selectType.value == "fcfs") {
         
            let value = values.value;
            let valSplit = value.split(" ");
            let currentHead = headPosition.value;

            let totalTrackMovements = 0;
            let distance, currentTrack;


            const totalDuration = 5000;
            const delayBetweenPoints = totalDuration / valSplit.length;
            const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

            valSplit.unshift(currentHead);
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: fcfs(valSplit, currentHead),
                    datasets: [{
                        label: "First Come First Serve",
                        data: valSplit,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 3,
                        lineTension: 0,
                    }]
                },
                options: {
                    animation: {
                        x: {
                            type: 'number',
                            easing: 'linear',
                            duration: delayBetweenPoints,
                            from: NaN, // the point is initially skipped
                            delay(ctx) {
                            if (ctx.type !== 'data' || ctx.xStarted) {
                                return 0;
                            }
                            ctx.xStarted = true;
                            return ctx.index * delayBetweenPoints;
                            }
                        },
                        y: {
                            type: 'number',
                            easing: 'linear',
                            duration: delayBetweenPoints,
                            from: previousY,
                            delay(ctx) {
                            if (ctx.type !== 'data' || ctx.yStarted) {
                                return 0;
                            }
                            ctx.yStarted = true;
                            return ctx.index * delayBetweenPoints;
                            }
                        }
                    },
                    interaction: {
                        intersect: false
                    },
                    plugins: {
                        legend: false
                    },
                    scales: {
                        x: {
                            type: 'linear'
                        }
                    },
                    tooltips: {
                        enabled: true
                    },
                    hover: {
                        animationDuration: 1
                    },
                    scales: {
                        y: {
                            title: {
                            display: true,
                            text: 'Schedule Sequence'
                            }
                        },
                        x: {
                            title: {
                            display: true,
                            scaleShowLabels: false,
                            text: 'Seek Count'
                            }
                        }
                    }
                }
            });  

            function fcfs(seqValue, currentHead)
            {
                let tempArray = [];
                let seekCountSequence = [];

                for (let i = 0; i < seqValue.length; i++) {
                    let currentTrack = seqValue[i];
                    distance = Math.abs(currentTrack - currentHead);
                    totalTrackMovements += distance;
                    seekCountSequence.push(totalTrackMovements);
                    currentHead = currentTrack;
                }
                for (let i = 1; i < seqValue.length; i++) {
                    tempArray.push(seqValue[i]);
                }
                showResult(totalTrackMovements, tempArray);
                return seekCountSequence;
        }

        function showResult(count, vals) {
            if(count === "") {
                displaySeq.innerHTML = " ";
            }
            else {
                displaySeq.innerHTML += "[ " + currentHead + "," + vals + " ]";                
            }

            
            for (let i = 0; i < vals.length - 1; i++) {
                if (i == 0) {
                    displayTotal.innerHTML += " | " + currentHead + " - " + vals[i] + " | + ";
                    displayTotal.innerHTML += " | " + vals[i+1] + " - " + vals[i] + " | ";   
                }
                else {
                    displayTotal.innerHTML += " + | " +  vals[i+1] + " - " + vals[i] + " | ";
                }                                   
            }
                displayTotal.innerHTML += " = " + totalTrackMovements;                  
            }
    }

    if (selectType.value == "sstf") {

        let value = values.value;
        let valSplit = value.split(" ");
        let currentHead = headPosition.value;

        let countSequence = [];
        let seekAddressed = [];

        const totalDuration = 5000;
        const delayBetweenPoints = totalDuration / valSplit.length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

        valSplit.unshift(currentHead);
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sstf(valSplit, currentHead),
                legend: {
                    display: true
                },
                datasets: [{
                    label: "Shortest Seek Time First",
                    data: seekAddressed,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 3,
                    lineTension: 0,
                }]
            },
            options: {
                animation: {
                    x: {
                        type: 'number',
                        easing: 'linear',
                        duration: delayBetweenPoints,
                        from: NaN, // the point is initially skipped
                        delay(ctx) {
                          if (ctx.type !== 'data' || ctx.xStarted) {
                            return 0;
                          }
                          ctx.xStarted = true;
                          return ctx.index * delayBetweenPoints;
                        }
                      },
                      y: {
                        type: 'number',
                        easing: 'linear',
                        duration: delayBetweenPoints,
                        from: previousY,
                        delay(ctx) {
                          if (ctx.type !== 'data' || ctx.yStarted) {
                            return 0;
                          }
                          ctx.yStarted = true;
                          return ctx.index * delayBetweenPoints;
                        }
                      }
                },
                interaction: {
                    intersect: false
                },
                plugins: {
                    legend: false
                },
                scales: {
                    x: {
                        type: 'linear'
                    }
                },
                tooltips: {
                    enabled: true
                },
                hover: {
                    animationDuration: 1
                },
                scales: {
                    y: {
                        title: {
                        display: true,
                        text: 'Schedule Sequence'
                        }
                    },
                    x: {
                        title: {
                        display: true,
                        scaleShowLabels: false,
                        text: 'Seek Count'
                        }
                    }
                }
            }
        });

        function sstf(seqValue, currentHead) {
            let tempArray = [];
            let visited = [];
            let totalNumbers = seqValue.length;
            let totalTrackMovements = 0;
            let distance = 0;
            let temp;
            
            for (let i = 0; i < totalNumbers; i++) {
                visited.push(0);
            }
            temp = parseInt(currentHead);

            for (let i = 0; i < totalNumbers; i++) {
                let minValue = 1000000;
                let index;
                for (let j = 0; j < totalNumbers; j++) {
                    if (Math.abs(temp - seqValue[j]) < minValue && (visited[j] === 0)) {
                        index = j;
                        minValue = Math.abs(temp - seqValue[j]);
                    }
                }
                totalTrackMovements += Math.abs(temp - seqValue[index]);
                countSequence.push(totalTrackMovements);
                visited[index] = 1;
                temp = seqValue[index];
                seekAddressed.push(seqValue[index]);
            }
            for (let i = 1; i < totalNumbers; i++) {
                tempArray.push(seekAddressed[i]);
            }
            showResult(totalTrackMovements, tempArray);
            return countSequence;
            
            function showResult(count, vals) {
                if(count === "") {
                    displaySeq.innerHTML = " ";
                }
                else {
                    displaySeq.innerHTML += "[ " + currentHead + "," + vals + " ]";                
                }
    
                
                for (let i = 0; i < vals.length - 1; i++) {
                    if (i == 0) {
                        displayTotal.innerHTML += " | " + currentHead + " - " + vals[i] + " | + ";
                        displayTotal.innerHTML += " | " + vals[i+1] + " - " + vals[i] + " | ";   
                    }
                    else {
                        displayTotal.innerHTML += " + | " +  vals[i+1] + " - " + vals[i] + " | ";
                    };                                    
                }
                    displayTotal.innerHTML += " = " + totalTrackMovements;  
            }
        }     
    }

    if (selectType.value == "look") {  
        
        let value = values.value;
        let valSplit = value.split(" ");
        let currentHead = headPosition.value;
        let totalTrackMovements = 0;
        let distance;

        let countSequenceRight = [];
        let seekRight = [];


        const totalDuration = 5000;
        const delayBetweenPoints = totalDuration / valSplit.length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

    
        valSplit.unshift(currentHead);
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: lookRight(valSplit, currentHead),
                legend: {
                    display: true
                },
                datasets: [{
                    label: "LOOK",
                    data: seekRight,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 3,
                    lineTension: 0,
                }]      
            },
            options: {
                animation: {
                    x: {
                        type: 'number',
                        easing: 'linear',
                        duration: delayBetweenPoints,
                        from: NaN, // the point is initially skipped
                        delay(ctx) {
                        if (ctx.type !== 'data' || ctx.xStarted) {
                            return 0;
                        }
                        ctx.xStarted = true;
                        return ctx.index * delayBetweenPoints;
                        }
                    },
                    y: {
                        type: 'number',
                        easing: 'linear',
                        duration: delayBetweenPoints,
                        from: previousY,
                        delay(ctx) {
                        if (ctx.type !== 'data' || ctx.yStarted) {
                            return 0;
                        }
                        ctx.yStarted = true;
                        return ctx.index * delayBetweenPoints;
                        }
                    }
                },
                interaction: {
                    intersect: false
                },
                plugins: {
                    legend: false
                },
                scales: {
                    x: {
                        type: 'linear'
                    }
                },
                tooltips: {
                    enabled: true
                },
                hover: {
                    animationDuration: 1
                },
                scales: {
                    y: {
                        title: {
                        display: true,
                        text: 'Schedule Sequence'
                        }
                    },
                    x: {
                        title: {
                        display: true,
                        scaleShowLabels: false,
                        text: 'Seek Count'
                        }
                    }
                }
            }
        });

        function lookRight(seqValue, currentHead) {
            let tempArray = [];
            let leftArray = [];
            let rightArray = [];

            for (let i = 0; i < seqValue.length; i++)
            {
                if (seqValue[i] < currentHead)
                {
                    leftArray.push(seqValue[i]);
                }
                else
                {
                    rightArray.push(seqValue[i]);
                }
            }
            leftArray.sort(function (a, b) {
                return a - b;
            })

            rightArray.sort(function (a, b) {
                return a - b;
            })

            for (let i = 0; i < rightArray.length; i++) {
                seekRight.push(rightArray[i]);
            }
            for (let i = leftArray.length - 1; i >= 0; i--) {
                seekRight.push(leftArray[i]);
            }

            let seekAddressedLength = seekRight.length;

            for (let i = 0; i < rightArray.length; i++) {
                let currentTrack = rightArray[i];
                distance = Math.abs(currentTrack - currentHead);
                totalTrackMovements += distance;
                countSequenceRight.push(totalTrackMovements);
                currentHead = currentTrack;
            }
            for (let i = leftArray.length - 1; i >= 0; i--) {
                let currentTrack = leftArray[i];
                distance = Math.abs(currentTrack - currentHead);
                totalTrackMovements += distance;
                countSequenceRight.push(totalTrackMovements);
                currentHead = currentTrack;
            }
            for (let i = 1; i < seekAddressedLength; i++) {
                tempArray.push(seekRight[i]);
            }
            showResult(totalTrackMovements, tempArray);
            return countSequenceRight;
        }

        function showResult(count, vals) {
            if(count === "") {
                displaySeq.innerHTML = " ";
            }
            else {
                displaySeq.innerHTML += "[ " + currentHead + "," + vals + " ]";                
            }

            
            for (let i = 0; i < vals.length - 1; i++) {
                if (i == 0) {
                    displayTotal.innerHTML += " | " + currentHead + " - " + vals[i] + " | + ";
                    displayTotal.innerHTML += " | " + vals[i+1] + " - " + vals[i] + " | ";   
                }
                else {
                    displayTotal.innerHTML += " + | " +  vals[i+1] + " - " + vals[i] + " | ";
                };                                    
            }
                displayTotal.innerHTML += " = " + totalTrackMovements;                  
        }             
    }
});

reset.addEventListener("click", function() {
    window.location.reload();
});