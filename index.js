const getData = async () => {
  let text;

  await fetch('primjer1.txt')
    .then(res => {
      return res.text();
    })
    .then(data => {
      text = data;
    })

  console.log(text);

  const bracketLocation = (text) => {
    const brackets = [];

    for (let i in text) {
      if (text[i] === "{") {
        brackets.push(i);
      }else if (text[i] === "}") {
        brackets.push(i);
      }
    }

    return brackets;
  }

  const getObjects = (text) => {
    const brackets = bracketLocation(text);
    const objArr = [];
    console.log(brackets);

    for (let i = 0; i < brackets.length; i+=2) {
      let num = i;
      console.log("i", i);
      const first = parseInt(brackets[num]);
      const second = parseInt(brackets[num += 1]);
      console.log("first ",first);
      console.log("second ",second);

      objArr.push({
        type: text.slice(first + 1, second),
        content: text.slice(second + 1, parseInt(brackets[num+=1]))
      });
    }

    return objArr;
  }

  getObjects(text);
  console.log(getObjects(text));
}

getData();