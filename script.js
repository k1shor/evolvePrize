let result = document.getElementById("result")
let btn = document.getElementById("btn")
let loader = document.getElementById('loader')
let prize_img = document.getElementById('prize_img')

prize_img.src = "https://www.evolveithub.com/assets/frontend/image/logo/logo2.png"

let prizes = ["PEN", "OPTICAL MOUSE", "RECHARGE CARD"]
let prizes_img = [
    "https://th.bing.com/th/id/OIP.-H2lqHQmzdMVrKTc_U8V3QHaHa?rs=1&pid=ImgDetMain",
    "https://www.quietpc.com/images/products/logitech-b100-large.jpg",
    "https://3.bp.blogspot.com/-pxphRh2Sof0/VrfnZus47cI/AAAAAAAAAKE/cyQK4kd7Mh4/s1600/NTC%2BRecharge%2BCards.png"]

let won = localStorage.getItem('evolve-result') ?
    JSON.parse(localStorage.getItem('evolve-result')) : []

let prize
let loading = false

function generatePrizes() {
    for (i = 0; i < 200; i++) {
        let new_item = document.createElement('button')
        if (i < 50) {
            new_item.innerHTML = prizes[0]
        }
        else if (i < 150) {
            new_item.innerHTML = prizes[1]
        }
        else {
            new_item.innerHTML = prizes[2]
        }

        if (isNewResult(i)) {
            new_item.style.backgroundColor = "green"
        }
        else {
            new_item.style.backgroundColor = "red"
        }
        result.appendChild(new_item)
    }
}

function roll() {
    loading = true
    prize_img.classList.add('hidden')
    result.innerHTML = ""
    showResult()
    setTimeout(() => {
        let result = Math.floor(Math.random() * 200)
        if (isNewResult(result)) {
            if (result < 50) {
                prize = 'CONGRATULATIONS! <BR>YOU HAVE WON <BR>' + prizes[0]
                prize_img.src = prizes_img[0]
            }
            else if (result < 150) {
                prize = 'CONGRATULATIONS! <BR>YOU HAVE WON <BR>' + prizes[1]
                prize_img.src = prizes_img[1]
            }
            else {
                prize = 'CONGRATULATIONS! <BR>YOU HAVE WON <BR>' + prizes[2]
                prize_img.src = prizes_img[2]
            }
            won.push({ result, prize })
            localStorage.setItem('evolve-result', JSON.stringify(won))
            loading = false
            showResult()
        }
        else {
            console.log("rolling again")
            roll()
        }

    }, [3000])

}

function showResult() {
    if (loading) {
        // result.innerHTML = "Loading..."
        loader.classList.remove('hidden')
        prize_img.src = "https://www.evolveithub.com/assets/frontend/image/logo/logo2.png"
    }
    else {
        loader.classList.add('hidden')
        result.classList.remove('hidden')
        prize_img.classList.remove('hidden')
        result.innerHTML = prize
    }
}

function isNewResult(result) {
    let results = won.map(i => i.result)
    console.log(result)
    if (results.find(i => i === result)) {
        return false
    }
    else {
        return true
    }
}

btn.addEventListener('click', roll)

