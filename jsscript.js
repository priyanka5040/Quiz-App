const questionDB = [
    {
      id:1001,
      question: "What is the scientific name of a butterfly?",
      answers: ["Apis", "Coleoptera", "Formicidae", "Rhopalocera"],
      correctIndex: 3
    },
    {
        id:1002,
      question: "How hot is the surface of the sun?",
      answers: ["1,233 K", "5,778 K", "12,130 K", "101,300 K"],
      correctIndex: 1
    },
    {
        id:1003,
      question: "Who are the actors in The Internship?",
      answers: [
        "Ben Stiller, Jonah Hill",
        "Courteney Cox, Matt LeBlanc",
        "Kaley Cuoco, Jim Parsons",
        "Vince Vaughn, Owen Wilson"
      ],
      correctIndex: 3
    },
    {
        id:1004,
      question: "What is the capital of Spain?",
      answers: ["Berlin", "Buenos Aires", "Madrid", "San Juan"],
      correctIndex: 2
    },
    {
        id:1005,
      question:
        "What are the school colors of the University of Texas at Austin?",
      answers: [
        "Black, Red",
        "Blue, Orange",
        "White, Burnt Orange",
        "White, Old gold, Gold"
      ],
      correctIndex: 2
    },
    {
        id:1006,
      question: "What is 70 degrees Fahrenheit in Celsius?",
      answers: ["18.8889", "20", "21.1111", "158"],
      correctIndex: 2
    },
    {
        id:1007,
      question: "When was Mahatma Gandhi born?",
      answers: [
        "October 2, 1869",
        "December 15, 1872",
        "July 18, 1918",
        "January 15, 1929"
      ],
      correctIndex: 0
    },
    {
        id:1008,
      question: "How far is the moon from Earth?",
      answers: [
        "7,918 miles (12,742 km)",
        "86,881 miles (139,822 km)",
        "238,400 miles (384,400 km)",
        "35,980,000 miles (57,910,000 km)"
      ],
      correctIndex: 2
    },
    {
        id:1009,
      question: "What is 65 times 52?",
      answers: ["117", "3120", "3380", "3520"],
      correctIndex: 2
    },
    {
        id:1010,
      question: "How tall is Mount Everest?",
      answers: [
        "6,683 ft (2,037 m)",
        "7,918 ft (2,413 m)",
        "19,341 ft (5,895 m)",
        "29,029 ft (8,847 m)"
      ],
      correctIndex: 3
    },
    {
        id:1011,
      question: "When did The Avengers come out?",
      answers: ["May 2, 2008", "May 4, 2012", "May 3, 2013", "April 4, 2014"],
      correctIndex: 1
    },
    {
        id:1012,
      question: "What is 48,879 in hexidecimal?",
      answers: ["0x18C1", "0xBEEF", "0xDEAD", "0x12D591"],
      correctIndex: 1
    }
  ];

function calculateScore(questions){
  total = 0;

  questions.forEach((a) =>{
    total += a.score;
  });

  return total;
}

class Question {
    constructor(id, question, answers, correctIndex){
        this.id = id;
        this.question = question;
        this.answers = answers;
        this.correctIndex = correctIndex;
    }
    createDOM(){
        const qtnContainer = document.createElement('div');

        const questionHeader = document.createElement('h2');
        questionHeader.textContent = this.question;
        qtnContainer.appendChild(questionHeader);

        qtnContainer.appendChild(this.createOptionContainer());

        return qtnContainer;
    }

    isCorrect(o){
        return(o == this.answers[this.correctIndex]);
    }

    createOptionContainer(){
            const optionList = document.createElement('div');
            optionList.className = 'optionList';
            this.answers.forEach(o => {
            
            const option = document.createElement('div');
            option.className = 'option';
            option.textContent = o;
    
            optionList.appendChild(option);

            
            //optionList.appendChild(label);

            if(this.isCorrect(o)){
              option.setAttribute('correct-data',true);
              //label.setAttribute('correct-data',true);
              //optnCont.setAttribute('correct-data', true);
            }
            
        });
        return optionList;
    }

}

class Quiz {
    constructor(questionObj, root, resultContainer) {
        this.i = 0;
        this.questionObj = questionObj;
        this.root = root;
        this.totalScore = 0;
        this.resultContainer = resultContainer;
        //this.prev = this.getPrevbtn();
        this.next = this.getNextbtn();
        this.flag = true;
        //console.log(this.next);

        this.root.addEventListener('click',(e) => {

            if(this.flag){
              if(e.target.getAttribute('correct-data')) {
                //alert('correct');
                console.log(e.target);
                e.target.style.backgroundColor = '#7FFF00';
                this.questionObj[this.i].score += 10;
                this.totalScore = calculateScore(this.questionObj);
                document.getElementById('score').textContent = `Score : ${this.totalScore}`;
                
              }
              else if(e.target.getAttribute('class') === 'option'){
                e.target.style.backgroundColor = 'red';
              }
              this.flag = false;
            }
            
            
        });

        questionObj.forEach((q)=>{
          q.score = 0;
        });
        //console.log(questionObj);
    }

    getNextbtn(){
        
        const buttonCont = document.getElementById('btn');
        const btn = document.createElement('button');
        btn.textContent = 'Next';

        btn.addEventListener('click',()=>{

            this.i += 1;
            this.flag = true;
            if(this.i >= 12){
              this.stopQuiz();
            }
            else{
              // let btn = this.prev.firstElementChild;
              // btn.disabled = false;
              
              //console.log(btn);
              this.updateQuestion();
            }
            
        });
        buttonCont.appendChild(btn);
        return buttonCont;
    }

    // getPrevbtn(){
        
    //   const buttonCont = document.getElementById('btn');
    //   buttonCont.style.marginTop = '15px';
    //   const btn = document.createElement('button');
    //   btn.disabled = 'true';
    //   btn.textContent = 'Previous';

    //   btn.addEventListener('click',()=>{

    //       this.i -= 1;
    //       if(this.i < 1){
    //         btn.disabled = 'true';
    //       }
          
    //       this.updateQuestion();
          
          
    //   });
    //   buttonCont.appendChild(btn);
    //   return buttonCont;
    // }
    updateQuestion(){

        let q = this.questionObj[this.i].createDOM();
        this.root.firstElementChild.replaceWith(q);
        
    }

    createQuiz(){
        let q = this.questionObj[this.i].createDOM();
        this.root.appendChild(q);
        let qui = document.querySelector('.quiz');
        
        //qui.appendChild(this.prev);
        qui.appendChild(this.next);
        

        //this.root.firstElementChild.replaceWith(this.questionObj[this.i].createDOM());
    }

    stopQuiz(){
      this.resultContainer.openContainer(this.totalScore);
      
    }

}

class Result {
  constructor(resultContainer){
    this.resultContainer = resultContainer;
    

    let close = document.getElementById('close');
    close.addEventListener('click',() => {
      this.closeContainer();
    })
  }

  openContainer(finalScore){
    
    document.getElementById('final').innerHTML = `<h2>Final Score : ${finalScore} / 120</h2>`;
    let app = document.getElementById('app');
    
    //app.style.opacity = 0.5;
    app.style.filter = 'blur(10px)';
    
    this.resultContainer.style.display = 'block';

  }
  closeContainer(){
    let app = document.getElementById('app');
    this.resultContainer.style.display = 'none';
    app.style.filter = 'blur(0px)';
    app.style.display = 'block';
    app.style.opacity = 1;
  }
}

const app = document.getElementById('app');

let result = document.getElementById('result');
let resultContainer = new Result(result);

const questions = questionDB.map((q)=>{
    return new Question(q.id, q.question, q.answers, q.correctIndex);
});
//console.log(questions);

const quiz = new Quiz(questions, app, resultContainer);
quiz.createQuiz();

console.log("hello");