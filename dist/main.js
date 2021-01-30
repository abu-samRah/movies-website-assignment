$(document).ready(() => {
    getAllMovies(); //calling the getAllMovies functions
    //getting the user input from the serach bar
    $('#nav--searchForm').on('submit', (e) => {
        const searchInput = $('#searchForm--searchInput').val();
        const check = /^[0-9a-zA-Z]+$/.test(searchInput);
        //validating the user input
        if (check) {
            getMovies(searchInput); //calling the getMovies function on the user search input
            $('#nav--searchErrorMessage').addClass("hidden"); //hidding the error messages if any from previous search
        } else {
            $('#nav--searchErrorMessage').removeClass("hidden"); //displaying the error messages to the user
        }

        e.preventDefault();
    });
});


/*
desc: this function is responsble for displaying the main page movies when the user access the website for the first time
args: none
return: none
*/
function getAllMovies() {
    // sending a request to the omdb api and fitching the response data
    axios.get('http://www.omdbapi.com/?s=' + 'home' + '&apikey=9be27fce')
        .then((response) => {
            const moviesList = response.data.Search;
            let output = '';
            //loping through the response data and displaying the movies
            $.each(moviesList, (index, movie) => {

                output += `
                    <div class=" text-gray-700 text-center bg-white-100 box-border rounded inline-block lg:w-1/4 md:w-1/3 sm:w-2/4 xsm:w-6/12 mx-1 mb-4">
                    <div class="flex flex-col">
                        <div class="flex-shrink-0 h-div" >
                            <img class="rounded-t-lg  h-full w-full object-fill"  src="${movie.Poster}" alt="" />
                        </div>
                        <div class=" bg-blue-600 rounded-b-lg pl-1 pt-1 lg:pl-5 xl:h-textxlg lg:h-textlg md:h-textmd sm:h-textsm xsm:h-textxsm" >
                            <div class="uppercase tracking-wide text-center text-sm text-gray-100 font-bold">
                            ${movie.Title}
                            </div>
                            <div class="flex justify-between text-blue-200  ">
                                <div class="m-1 w-3/5 text-left text-sm  leading-tight font-semibold">
                                    Type: ${movie.Type} </div>
                                <div class="m-1 w-2/5 text-left text-sm  leading-tight font-semibold">
                                    Year:${movie.Year} 
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
                
                    `;
            });

            $('#moviesContainer').html(output)

        })
        .catch((err) => {
            console.log(err)
        })
}


/*
desc: this function is responsble for displaying the results of the user search 
args: searchInput
return: none
*/
function getMovies(searchInput) {
    // sending a request to the omdb api and fitching the response data
    axios.get('http://www.omdbapi.com/?s=' + searchInput + '&apikey=9be27fce')
        .then((response) => {
            console.log(response)
            const moviesList = response.data.Search; //getting the search results
            const responseStatus = response.data.Response //getting the search status

            let output = '';
            //checks if the respons is valid or not , if not display an appropriate message to the user 
            if (responseStatus == "False") {
                output = `  
                            <div class="bg-red-100 border border-red-700 text-red-700 px-4 py-3 rounded relative my-5 shadow-xl">
                            <strong class="font-bold">Error Message:</strong>
                            <span class="block sm:inline">Please search for a valid name or try to be more specific.</span>
                            </div>
                            `;

                $('#noMatchingSearch').html(output)
                $('#tradeStatment').addClass('hidden');
                $('#moviesContainer').html('');
            } else {
                //loping through the response data and displaying the movies
                $.each(moviesList, (index, movie) => {

                    output += `
                    <div class=" text-gray-700 text-center bg-white-100 box-border rounded inline-block lg:w-1/4 md:w-1/3 sm:w-2/4 xsm:w-6/12 mx-1 mb-4">
                    <div class="flex flex-col">
                        <div class="flex-shrink-0 h-div" >
                            <img class="rounded-t-lg  h-full w-full object-fill"  src="${movie.Poster}" alt="" />
                        </div>
                        <div class=" bg-blue-600 rounded-b-lg pl-1 pt-1 lg:pl-5 xl:h-textxlg lg:h-textlg md:h-textmd sm:h-textsm xsm:h-textxsm" >
                            <div class="uppercase tracking-wide text-center text-sm text-gray-100 font-bold">
                            ${movie.Title}
                            </div>
                            <div class="flex justify-between text-blue-200  ">
                                <div class="m-1 w-3/5 text-left text-sm  leading-tight font-semibold">
                                    Type: ${movie.Type} </div>
                                <div class="m-1 w-2/5 text-left text-sm  leading-tight font-semibold">
                                    Year:${movie.Year} 
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                
                    `;

                });

                $('#moviesContainer').html(output)
                $('#noMatchingSearch').addClass("hidden")
                $('#tradeStatment').removeClass('hidden');
            }

        })
        .catch((err) => {
            console.log("err")
        })
}