function init() {]
    console.log('%c HI', 'color: firebrick')
    part1()
    part2()
    //part 3 runs in part 2 create the event listener in part 2 as well
    part4()

//PART 1
// add js that on page load will fetch the images using the url given
// parses the response as Json
// adds elements to the DOM for each image in the array 

function part1(){
    fetch("https://dog.ceo/api/breeds/image/random/4") //go to api
    .then((resp) => resp.json()) //turn api info into json format
    .then((data) => addImage(data)) //data is an Object where element 1(message) is the array with 4 links to images
}
function addImage(data){
    let imgArray = data.message
    for (let val in imgArray){  //iterate over the array of images. 
        let imgURL = imgArray[val].slice(0,imgArray[val].lenth) //need to remove the quotation marks to get to the actual img
        const dogImg = document.createElement('img') //create image element
        dogImg.src = imgURL //set image element source to the URL
        dogImg.alt = 'not found' //was testing looked like only 2 loaded
        let container = document.querySelector('#dog-image-container') //access the container where pictures will go
        container.appendChild(dogImg) //add the pictures
    }
}

// Part 2
// We have a new URL const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
// Fetch the Images from that
// Parse it as JSON
// Add the breeds to the page in the ul

//Should work the same was as above, we need to just see how the data is returned from the api and adjust and then change the location to add with dog breeds id

function part2(){
    fetch("https://dog.ceo/api/breeds/list/all") //go to api
    .then((resp) => resp.json())
    .then((data) => addBreed(data))
}

function addBreed(data){
    // this data once again returns an object. The message is an object with key:value, where the value returns an array of breeds?
    // ex: bulldog : [boston, english, french]
    let breed_obj = data.message
    for (const key in breed_obj){ //some of the keys will have arrays with subbreed. not sure what its called if so
        // Assuming the subbreed? will get its own so boston bulldog, english bulldog etc
        //console.log(key)
        //console.log(breed_obj[key]) //this is the subbreed i guess 
        //console.log(breed_obj[key].length)
        //lets create the elements for tree here before the loop over the subbreed if needed
               
        const loc = document.querySelector('#dog-breeds') //where we will append      
        if (breed_obj[key].length === 0){
            const breedname = document.createElement('li')
            let breed = key
            breedname.textContent = breed
            breedname.style.color = 'green'
            //part 3 work
            breedname.addEventListener('click', (e) => { //adds event listener to the object
                //change color in the fcn 
                e.target.style.color = 'orange' //from the event we get the target and then change the color.could make it a random RGB value probably
            })  
            loc.appendChild(breedname)
        }
        else { //for the ones where there is an array with elements
            for (let val in breed_obj[key]){ 
                const breedname = document.createElement('li')
                let breed = key + " " + breed_obj[key][val] //combine the name
                breedname.textContent = breed
                breedname.addEventListener('click', (e) => { //adds event listener to the object
                    //change color in the fcn 
                    e.target.style.color = 'orange' //from the event we get the target and then change the color.could make it a random RGB value probably
                })  
            loc.appendChild(breedname)
            }
        }        
    }

}

//Part 3
// Add event listener to the element as we create it and have the change color. 

//Part 4
// Need to add a filter that lets us filter the breeds that start with the letter selected. 
//Once we click on the dropdown we need to take the value and compare it against the textcontent for the li

function part4(){
    //get the value that has been selected
    // for the selet element we can use the change event
    let t = document.querySelector('#breed-dropdown') //why is this null, but when i use browser console it has a value
    console.log(t)
    t.addEventListener("change", (e) =>{
        //get the value out of e
        let filter = e.target.value //should be the value we want to filter by
        let breeds = document.querySelector('#dog-breeds')
        for (let idx = 1; idx <= breeds.childNodes.length-1; idx++){ //need to skip idx 1
            //console.log(breeds.childNodes[idx].textContent)
            if (breeds.childNodes[idx].textContent.charAt(0).toLowerCase() !== filter.toLowerCase()){
                breeds.childNodes[idx].style.visibility = 'hidden'
            } 
            else{
                breeds.childNodes[idx].style.visibility = 'visible'
            } 
        }
    })
}
}

document.addEventListener("DOMContentLoaded", init());

//check after
// breedsToShowOnScreen = breeds.childNodes.filter((breed) => breed.textContent.charAt(0).toLowerCase == filter)