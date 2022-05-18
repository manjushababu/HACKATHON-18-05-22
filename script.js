// Banner Image component
let bannerImage = document.createElement("div");
bannerImage.setAttribute("class", "banner");

// Search component
let searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Search...")
searchInput.setAttribute("name", "search");
searchInput.setAttribute("class", "searchInput");
searchInput.addEventListener("change", filterBooks);
bannerImage.appendChild(searchInput);

// Display books
let main = document.createElement("main");

let heading = document.createElement('h2');
heading.innerHTML = "From your Library";
heading.setAttribute("class", "heading");
main.appendChild(heading);


const fetchBooks = async () => {
    const size = 50;
    const response = await fetch(`https://anapioficeandfire.com/api/books?page=1&pageSize=${size}`);
    const data = await response.json();
    const booksData = data;
    console.log('data ', booksData)
    return booksData;
}

async function filterBooks (event) {
    const data = await fetchBooks();
    console.log('value ', event.target.value);
    let filteredData = [];
    if (event.target.value) {
        filteredData = data?.filter(val => val.name.toLowerCase().includes(event.target.value.toLowerCase()))
    }
    console.log(filteredData);
    generateBooks(filteredData);
}

// Creating book wrapper
const container = document.createElement("container");
container.setAttribute("class", "container");


const generateBooks = async (filteredData = []) => {
    let data = [];
    console.log('filteredData ', filteredData);
    if (filteredData.length > 0) {
        data = [...filteredData];
        container.innerHTML = "";
    } else {
        data = await fetchBooks();
        container.innerHTML = "";
    }
    for(let i=0; i < data.length; i ++) {
        const book = document.createElement("div");
        book.classList.add("book-container");
        const bookImage = document.createElement("div");
        bookImage.style.height = '225px';
        bookImage.style.width = '100%';
        const image = document.createElement("img");
        image.style.height = '100%';
        image.style.width = '100%';
        image.setAttribute("src", "./assets/book_image.jpeg");
        const bookDesc = document.createElement("div");
        bookDesc.setAttribute("class", "book-desc-wrapper");
        // Book details
        const bookName = document.createElement("div");
        bookName.innerHTML = `<b>${data[i].name}</b>`;
        const bookDeatils = document.createElement("div");
        bookDeatils.setAttribute("class", "book-details-wrapper");
        const bookDeatilsHeading = document.createElement("div");
        bookDeatilsHeading.setAttribute("class", "book-details-heading");
        bookDeatilsHeading.innerHTML = "<div>ISBN:</div><div>No of pages:</div><div>Publisher name:</div><div>Release date:</div><div>Authors:</div>"
        const bookDeatilsValue = document.createElement("div");
        bookDeatilsValue.setAttribute("class", "book-details-value");
        const isbn = document.createElement("div");
        isbn.innerHTML = data[i].isbn;
        const noOfPages = document.createElement("div");
        noOfPages.innerHTML = data[i].numberOfPages;
        const publisher = document.createElement("div");
        publisher.innerHTML = data[i].publisher;
        const released = document.createElement("div");
        released.innerHTML = data[i].released;
        const authors = document.createElement("ul");
        data[i].authors.forEach(element => {
            const list = document.createElement("li");
            list.innerHTML = element;
            authors.appendChild(list);
        });
        const charactersText = document.createElement("div");
        charactersText.innerHTML = "<b>Characters</b>"
        charactersText.style.margin = "10px 0";
        charactersText.style.textAlign = "left";
        const characters = document.createElement("ol");
        // const dummy = data[i].characters.map((val, index) => {
        //     if (index < 5) {
        //         return fetchCharaters(val).then(data => data);
        //     }
        // });
        const size = data[i].characters.slice(0, 5);
        const slicedArr =  await fetchCharaters(size);
        console.log('slicedArr ', slicedArr);
        slicedArr?.forEach(element => {
            console.log('forEach ', element);
            const list = document.createElement("li");
            list.innerHTML = element;
            characters.appendChild(list);
        });
        bookDeatilsValue.append(isbn, noOfPages, publisher, released, authors);
        bookDeatils.append(bookDeatilsHeading, bookDeatilsValue);
        bookDesc.append(bookName, bookDeatils, charactersText, characters);
        book.append(bookImage, bookDesc);
        bookImage.appendChild(image);
        container.appendChild(book);
    }
}
generateBooks();

async function fetchCharaters (charactersData) {
    const characters = [...charactersData];
    const charArr = [];
    console.log('data length ', characters.length, characters);
    for(let i = 0; i<characters.length; i++) {
        const response = await fetch(characters[i]);
        const data = await response.json();
        console.log('data ', i, data);
        if (data.name) {
            charArr.push(data.name);
        }
    }
    return charArr;
}

main.appendChild(container);
document.body.append(bannerImage, main);
