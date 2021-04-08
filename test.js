(async() => {
  console.log("nešto");
  let text = "";
  let objectsArr = [];
  const regEx = /([{}])/g;

  await fetch('primjer2.txt')
    .then(res => {
      return res.text();
    })
    .then(data => {
      text = data;
    })
  
  console.log(text);

  const parts = text.split(regEx);

  //const filteredParts = parts.filter(el => !regEx.test(el));

  //check if first part of string is text
  if (parts[0] !== "{") {
    objectsArr.push({ type: "text", content: parts[0] });
    parts.shift();
  }

  console.log(parts);

  for (let i = 0; i < parts.length; i++) {
    let num = i;
    if (parts[num] === "{" && parts[num + 2] === "}") {
      if (parts[num + 1].endsWith("/")) {
        const selfClosing = parts[num + 1];
        const selfClosingArr = selfClosing.split(/([\n=])/).filter(el => !RegExp(/([\n=])/).test(el));      
        const type = selfClosingArr[0];
        selfClosingArr.shift();

        const obj = {
          type,
          attributes: {}
        };

        for (let i = 0; i < selfClosingArr.length; i+=2) {
          let num = i;
          obj.attributes[selfClosingArr[num]] = selfClosingArr[num + 1];
        }

        objectsArr.push(obj);
      } else if (parts[num + 1].startsWith("/")) { 
        objectsArr.push({ type: "text", content: parts[num + 3] });
      } else {
        objectsArr.push({ type: parts[num + 1], content: parts[num + 3] });
      }
    }
    
  }

  console.log(objectsArr);
  console.log(parts);

})();