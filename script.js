const container = document.querySelector(".container");
// chọn bất kì cái j từ DOM
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = parseInt(movieSelect.value);
// ticketPrice nằm trong movieSelect nên sẽ truy cập vào lấy giá trị
// ticketPrice là kiểu strings nên cần đổi thành kiểu số nguyên. có thể thay parseInt bằng + ở trước
// phải để let vì sau đổi movie thì giá tiền cũng đổi theo

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});
// kiểm tra nếu click vào class container và class seat, ko phải là class occupied
// ngoài ra khi click vào seat thì nó sẽ selected , hoặc xóa class selected đi

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // chọn tất cả seat selected trong 1 node list

  const selectedSeatsCount = selectedSeats.length;
  // tạo ra hàm này để đếm xem selectedSeats có length là bnh

  count.innerText = selectedSeatsCount;
  // in ra ở chỗ count và total
  total.innerText = selectedSeatsCount * ticketPrice;

  // Movie select event
  movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    // khi thay đổi movie thì giá tiền cũng đổi theo, + là parseInt
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
  });

  // muốn copy seletedSeat sang 1 mảng mới mà ko ảnh hưởng mảng cũ
  // lưu vào localStorage để khi load lại trong ko bị mất dữ liệu đã chọn
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  // muốn return ra tất cả index của seats đã đc chọn trước đó lấy ra value, ko bao gồm ghế occupied
  // indexof sẽ cho biết đc seatsIndex đã chọn gồm có những ghế ở vị trí index bnh [0,3,27... ]

  // localStorage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  //công thức localStorage.setItem('key',value)
  // vì seatsIndex là 1 arrays nên phải dùng JSON.stringify để convert thành 1 JSON string

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
// ko cần JSON.stringify vì ở trên setItem đã chuyển rồi

populateUI();
// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  // trước đó selectedSeats là strings nên h cần convert lại thành arrays
  //  JSON.parse đối ngược vs JSON.stringify

  // nếu ghế đã chọn >0 thì sẽ kiểm tra từng giá trị seats
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  // indexOf > -1 để đảm bảo selectedSeats nằm trong phạm vi của Arrays

  // cho selectedMovieIndex đã lưu ở localStorage hiện ra
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
// Initial count and total set
updateSelectedCount();
//nó sẽ giữ nguyên update count và price khi đổi movie
