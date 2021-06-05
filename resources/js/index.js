// import magazines from "./magazines.js";

// async function init() {
//   magazines.forEach(async (item) => {
//     let topic = await fetchTopics(item);
//     addTopicsToDOM(topic);
//   });
// }
async function init() {
  // init();
  debugger;
  let topic1 = await fetchTopics(magazines[0]);
  addTopicsToDOM(topic1, "innerCarouselOne", "btn-topic-one");
  let topic2 = await fetchTopics(magazines[1]);
  addTopicsToDOM(topic2, "innerCarouselTwo", "btn-topic-two");
  let topic3 = await fetchTopics(magazines[2]);
  addTopicsToDOM(topic3, "innerCarouselThree", "btn-topic-three");
}

async function fetchTopics(url) {
    try {
      let res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${url}`
      );
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    } catch (e) {
      return e;
    }
  }
  
  async function addTopicsToDOM(topic,carouselId,btnId) {
    
    let mainTopic = topic.feed.title;
    let top = document.getElementById(btnId);
    top.innerHTML = mainTopic;
     
    topic.items.forEach((ele) => {
      let div = document.createElement("div");
      div.setAttribute("class", "carousel-item");
  
      let a = document.createElement("a");
      a.href = ele.link;
      a.setAttribute("style", "color:black");
      a.setAttribute("target", "_blank");
      let image = document.createElement("img");
      image.src = ele.enclosure.link;
      image.setAttribute("class", "topic-card d-block w-100 image-fluid");
  
      let cardBody = document.createElement("div");
      cardBody.setAttribute("class", "card card-text");
      let h6 = document.createElement("h4");
      h6.innerHTML = ele.title;
      let p = document.createElement("p");
      p.innerHTML = ele.description;
      cardBody.appendChild(image);
      cardBody.appendChild(h6);
      cardBody.appendChild(p);
      
      a.appendChild(cardBody);
      // a.appendChild(div);
      div.appendChild(a);
  
      let carouselInner = document.getElementById(carouselId);
      carouselInner.append(div);
    });

    let item1 = document.getElementById(carouselId).getElementsByClassName("carousel-item");
    item1[0].classList.add("active");

    
    // let item = document.getElementsByClassName("carousel-item");
    // item[0].classList.add("active");
  
    // let container = document.getElementById("innerCarouselTwo");
    // let element = container.querySelector('.carousel-item');
    // element.classList.add("active");
  
    // let container2 = document.getElementById("innerCarouselThree");
    // let element2 = container2.querySelector('.carousel-item');
    // element2.classList.add("active");

  }
  
  // export {fetchTopics, addTopicsToDOM };
  // export {init};
  