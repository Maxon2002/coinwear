// console.log(document.documentElement.clientWidth)
// console.log(document.location.href)

let locationFile = document.location.pathname

let clientW = document.documentElement.clientWidth

let clientH = document.documentElement.clientHeight

console.log('W: ' + clientW, 'H: ' + clientH)

let mainImage = document.querySelector('.graph_img')
let mainImageContainer = document.querySelector('.graph')

let headerHeight = document.querySelector('.header').clientHeight
let headerWelcome = document.querySelector('.header_welcome')?.clientHeight

// let mainImageContainer = document.querySelector('.graph')

clientH -= headerHeight
// console.log(clientH)
// mainImageContainer.style.width = (clientW * 3) + 'px'
// mainImage.style.width = (clientW * 3) + 'px'
// mainImage.style.height = clientH + 'px'

let popupClientPhoto = document.querySelector('.popup_clientPhoto')
let popupClientPhotoImage = document.querySelector('.popup_image')
let popupClientPhotoName = document.querySelector('.popup_clientPhoto-name')

let productCardImages = document.querySelector('.product_card-images-container')

let widthproductCard = productCardImages?.clientWidth

let oneScrollProduct = widthproductCard / 3

let maxScrollProduct = widthproductCard / 3 * 2 + 'px'

let headerIcons = document.querySelector('.header_icons')
let headerInfo = document.querySelector('.header_info')
let headerPopup = document.querySelector('.header_popup')


document.addEventListener('click', function doc(e) {
    // console.log(e.target)
    let target = e.target

    if (target.closest('.review_image')) {
        popupClientPhotoName.innerHTML = target.id
        popupClientPhotoImage.firstElementChild.src = target.src
        popupClientPhoto.classList.add('active')
    }

    if (target.closest('.close_image')) {
        popupClientPhoto.classList.remove('active')
    }

    if (target.closest('.product_card-images-arrow-right')) {
        e.preventDefault()
        let productContainer = target.closest('.product_card-images-arrow-right').parentNode.firstElementChild

        if (productContainer.style.left !== '-' + maxScrollProduct) {
            if (productContainer.classList.contains('start')) {
                productContainer.classList.remove('start')
            }

            productContainer.style.left = productContainer.style.left.match(/(-*\d*)px/)[1] - oneScrollProduct + 'px'

            if (productContainer.style.left === '-' + maxScrollProduct) {
                productContainer.classList.add('end')
            }
        }




    }


    if (target.closest('.product_card-images-arrow-left')) {
        e.preventDefault()
        // console.log(getComputedStyle(productCardImages).left)
        let productContainer = target.closest('.product_card-images-arrow-left').parentNode.firstElementChild

        if (productContainer.style.left && productContainer.style.left !== '0px') {
            if (productContainer.classList.contains('end')) {
                productContainer.classList.remove('end')
            }
            // console.log(productCardImages.style.left.match(/(-*\d*)px/)[1])
            productContainer.style.left = +productContainer.style.left.match(/(-*\d*)px/)[1] + oneScrollProduct + 'px'

            if (productContainer.style.left === '0px') {
                productContainer.classList.add('start')
            }
        }



    }

    if (target.closest('.header_openPopup')) {
        headerPopup.classList.add('active')
    }
    if (target.closest('.header_closePopup')) {
        headerPopup.classList.remove('active')
    }

})







let containerProductImages


let productCardPosX1 = 0
let productCardPosX2 = 0
let productCardPosXInit = 0
// let productCardContainerLeftInit = 0

let productCardPosY1 = 0
let productCardPosYStart = 0


let indexProduct = 1
let posIndexProduct = 0

document.addEventListener('touchstart', (e) => {
    console.log(oneScrollProduct)
    if (e.target.closest('.product_card-images-container')) {
        containerProductImages = e.target.closest('.product_card-images-container')

        indexProduct = +containerProductImages.dataset.index
        posIndexProduct = +containerProductImages.dataset.pos

        productCardPosXInit = e.touches[0].clientX
        productCardPosYStart = window.pageYOffset

        console.log(indexProduct)
        console.log(posIndexProduct)
    }

    // console.log('start')
})
document.addEventListener('touchmove', (e) => {

    if (e.target.closest('.product_card-images-container') === containerProductImages) {
        productCardPosY1 = window.pageYOffset

        if (Math.abs(productCardPosYStart - productCardPosY1) < 5) {
            productCardPosX1 = e.touches[0].clientX
            productCardPosX2 = productCardPosXInit - productCardPosX1
        }

        if (posIndexProduct + -productCardPosX2 <= 0 && posIndexProduct + -productCardPosX2 >= -(oneScrollProduct * 2)) {

            containerProductImages.style.left = posIndexProduct + -productCardPosX2 + 'px'
        }
    }
})
document.addEventListener('touchend', (e) => {
    if (e.target.closest('.product_card-images-container') === containerProductImages) {
        if (Math.abs(productCardPosX2) < 60) {
            let go = true
            if (productCardPosX2 > 0) {
                if (indexProduct === 3) {
                    go = false
                }
            } else if (productCardPosX2 < 0) {
                if (indexProduct === 1) {
                    go = false
                }
            } else {
                go = false
            }

            if (go) {
                containerProductImages.classList.add('active')
                containerProductImages.style.left = posIndexProduct + 'px'
            }
        } else {
            let how
            if (productCardPosX2 > 0) {
                how = 'next'
            } else {
                how = 'prev'
            }

            if (how === 'next') {
                if (indexProduct < 3) {
                    +containerProductImages.dataset.index++
                    containerProductImages.dataset.pos -= oneScrollProduct
                    // indexProduct++
                    posIndexProduct -= oneScrollProduct
                    containerProductImages.classList.add('active')
                    containerProductImages.style.left = posIndexProduct + 'px'
                }
            } else {
                if (indexProduct > 1) {
                    containerProductImages.dataset.index--
                    containerProductImages.dataset.pos = +containerProductImages.dataset.pos + oneScrollProduct
                    // indexProduct--
                    posIndexProduct += oneScrollProduct
                    containerProductImages.classList.add('active')
                    containerProductImages.style.left = posIndexProduct + 'px'
                }
            }
        }
        productCardPosX2 = 0
    }
    // productCardContainerLeftInit = +productCardImages.style.left.slice(0, -2)
})
document.addEventListener('transitionend', (e) => {
    if (e.target.closest('.product_card-images-container') === containerProductImages) {
        containerProductImages.classList.remove('active')
    }
})







let reviewContainer = document.querySelector('.main_reviews-container')

let reviewPosX1 = 0
let reviewPosX2 = 0
let reviewPosXInit = 0
let reviewPosXFinal = 0
let reviewContainerLeftInit = 20

let posYStart = 0
let posY1 = 0


let indexReview = 1
let posIndexReview = 20

reviewContainer?.addEventListener('touchstart', (e) => {
    reviewPosXInit = e.touches[0].clientX
    posYStart = window.pageYOffset
    console.log('start')
    // console.log(posYStart)
    // if(!reviewContainer.style.left) reviewContainer.style.left = '0px'
})
reviewContainer?.addEventListener('touchmove', (e) => {

    posY1 = window.pageYOffset

    if (Math.abs(posYStart - posY1) < 5) {
        reviewPosX1 = e.touches[0].clientX
        reviewPosX2 = reviewPosXInit - reviewPosX1
    }


    console.log(reviewPosX2)

    console.log('mouve')
    // console.log(reviewContainer.style.left.slice(0, -2) + -reviewPosX2 + 'px')

    if (posIndexReview + -reviewPosX2 <= 20 && posIndexReview + -reviewPosX2 >= -820) {

        reviewContainer.style.left = posIndexReview + -reviewPosX2 + 'px'
    }
})
reviewContainer?.addEventListener('touchend', (e) => {
    console.log('end')
    console.log(reviewPosX2)
    if (Math.abs(reviewPosX2) < 100) {
        let go = true
        if (reviewPosX2 > 0) {
            if (indexReview === 4) {
                go = false
            }
        } else if (reviewPosX2 < 0) {
            if (indexReview === 1) {
                go = false
            }
        } else {
            go = false
        }

        if (go) {
            reviewContainer.classList.add('active')
            reviewContainer.style.left = posIndexReview + 'px'
        }
    } else {
        let how
        if (reviewPosX2 > 0) {
            how = 'next'
        } else {
            how = 'prev'
        }

        if (how === 'next') {
            if (indexReview < 4) {
                indexReview++
                posIndexReview -= 280
                reviewContainer.classList.add('active')
                reviewContainer.style.left = posIndexReview + 'px'
            }
        } else {
            if (indexReview > 1) {
                indexReview--
                posIndexReview += 280
                reviewContainer.classList.add('active')
                reviewContainer.style.left = posIndexReview + 'px'
            }
        }
    }
    reviewPosX2 = 0
    // reviewContainerLeftInit = +reviewContainer.style.left.slice(0, -2)
})


reviewContainer?.addEventListener('transitionend', (e) => {
    reviewContainer.classList.remove('active')
})








let basketQuantity = document.querySelector('.basket_quntity-number')
let basketNumber = 0


let paramsString = document.location.search
let params = new URLSearchParams(paramsString)


if (params.has('id')) {

    let shirtName = params.get('id')

    let productInfoName = document.querySelector('.product_info-name')

    productInfoName.innerHTML = shirtName

    let popColor = document.querySelector('.product_info-choice-color-pop')
    let popColorAll = document.querySelector('.product_info-choice-color-pop-all')
    let popColorMain = document.querySelector('.product_info-choice-color-pop-main')
    let popColorOne = document.querySelector('.product_info-choice-color-pop-one')


    let bigPhoto = document.querySelector('.product_photos-big')
    let smalsPhotoOne = document.querySelectorAll('.product_photos-smalls-one')

    let firstPrice = document.querySelector('.product_info-price-first')
    let discount = document.querySelector('.product_info-discount-number')



    async function reqServer() {
        let response = await fetch('http://coinwear:5000/user', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json;charset=utf-8'
            // },
            body: shirtName
        })
        let arrImages = await response.json()

        firstPrice.innerHTML = arrImages.prices.firstPrice
        discount.innerHTML = arrImages.prices.discount

        arrImages.colors = arrImages.colors.map(item => {
            item = item.replace(shirtName + ' ', '')
            return item.replace('.png', '')
        })

        arrImages.colors.splice(arrImages.colors.indexOf(`Clear`), 1)

        let trueBlack = arrImages.colors.includes('Black')
        let trueWhite = arrImages.colors.includes('White')

        let mainColor = trueBlack ? 'Black' : 'Dark Grey'
        let secondColor = trueWhite ? 'White' : 'Khaki'


        bigPhoto.firstElementChild.src = `images/${shirtName}/${shirtName} ${mainColor}.png`

        for (let i = 0; i < smalsPhotoOne.length; i++) {
            if (i === 0) {
                smalsPhotoOne[i].firstElementChild.src = `images/${shirtName}/${shirtName} ${mainColor}.png`
            }
            if (i === 1) {
                smalsPhotoOne[i].firstElementChild.src = `images/${shirtName}/${shirtName} ${secondColor}.png`
            }
            if (i === 2) {
                smalsPhotoOne[i].firstElementChild.src = `images/${shirtName}/${shirtName} Clear.png`
            }
        }

        popColorMain.firstElementChild.firstElementChild.src = `images/${shirtName}/${shirtName} ${mainColor}.png`
        popColorMain.lastElementChild.innerHTML = mainColor

        popColorOne.firstElementChild.src = `images/${shirtName}/${shirtName} ${mainColor}.png`
        popColorOne.lastElementChild.innerHTML = mainColor

        arrImages.colors.splice(arrImages.colors.indexOf(`${mainColor}`), 1)

        function createDiv(color) {
            let popColorOneNew = document.createElement('div')
            popColorOneNew.className = 'product_info-choice-color-pop-one'
            popColorOneNew.innerHTML =
                `<div class="product_info-choice-color-pop-one-image">
                <img src="images/${shirtName}/${shirtName} ${color}.png" alt="" width="100%">
            </div>
            <div>${color}</div>`

            // popColorOne.innerHTML = 'Привет'
            popColorAll.append(popColorOneNew)
        }

        for (let color of arrImages.colors) {
            createDiv(color)
        }
        popColorOne = document.querySelectorAll('.product_info-choice-color-pop-one')
        // console.log(arrImages)
    }
    reqServer()


    let popSize = document.querySelector('.product_info-choice-size-pop')
    let popSizeOne = document.querySelectorAll('.product_info-choice-size-pop-one')
    let popSizeMain = document.querySelector('.product_info-choice-size-pop-main')





    let popupAdd = document.querySelector('.add_cart')
    let popupAddColor = document.querySelector('.add_cart-color')
    let popupAddSize = document.querySelector('.add_cart-size')

    popupAdd?.addEventListener('transitionend', (e) => {
        setTimeout(() => {
            popupAdd.classList.remove('active')
        }, 2000)

    })


    document.addEventListener('click', function doc(e) {
        // console.log(e.target)
        let target = e.target
        if (popColor.classList.contains('active')) {
            // console.log('kfkdf')
            let go = false

            let elem = target.closest('.product_info-choice-color-pop-one')
            if (elem) {
                for (let p of popColorOne) {
                    p.classList.remove('active')
                }

                elem.classList.add('active')
                go = true
            } else {
                elem = target.closest('.product_info-choice-color-pop-all')
                if (!elem) {
                    go = true
                }
            }

            if (go) {
                popColor.classList.remove('active')

                for (let p of popColorOne) {
                    if (p.classList.contains('active')) {
                        // console.log(popColorMain.firstElementChild.firstElementChild)
                        popColorMain.firstElementChild.firstElementChild.src = p.firstElementChild.firstElementChild.src
                        popColorMain.lastElementChild.innerHTML = p.lastElementChild.innerHTML
                        bigPhoto.firstElementChild.src = p.firstElementChild.firstElementChild.src
                        break
                    }
                }

            }
        } else {
            let go = false
            let elem = target.closest('.product_info-choice-color-pop')
            if (elem) go = true

            if (go) {
                e.stopPropagation()
                popColor.classList.add('active')
            }

        }



        if (popSize.classList.contains('active')) {
            // console.log('kfkdf')
            let go = false

            let elem = target.closest('.product_info-choice-size-pop-one')
            if (elem) {
                for (let p of popSizeOne) {
                    p.classList.remove('active')
                }

                elem.classList.add('active')
                go = true
            } else {
                elem = target.closest('.product_info-choice-size-pop-all')
                if (!elem) {
                    go = true
                }
            }

            if (go) {
                popSize.classList.remove('active')

                for (let p of popSizeOne) {
                    if (p.classList.contains('active')) {
                        popSizeMain.firstElementChild.innerHTML = p.firstElementChild.innerHTML
                        break
                    }
                }

            }
        } else {
            let go = false
            let elem = target.closest('.product_info-choice-size-pop')
            if (elem) go = true

            if (go) {
                e.stopPropagation()
                popSize.classList.add('active')
            }

        }


        if (target.closest('.review_image')) {
            popupClientPhoto.classList.add('active')
        }


        if (target.closest('.product_photos-smalls')) {
            if (target.tagName === 'IMG') {
                bigPhoto.firstElementChild.src = target.src
                for (let p of smalsPhotoOne) {
                    p.classList.remove('active')
                }
                target.closest('.product_photos-smalls-one').classList.add('active')
            }
        }

        if (target.closest('.product_info-order-add')) {

            let productBasket = {
                image: popColorMain.firstElementChild.firstElementChild.src,
                name: shirtName,
                color: popColorMain.lastElementChild.innerHTML,
                size: popSizeMain.firstElementChild.innerHTML,
                firstPrice: +firstPrice.innerHTML.slice(0, -1),
                price: 23.99,
                firstPriceTotal: +firstPrice.innerHTML.slice(0, -1),
                priceTotal: 23.99,
                discount: +discount.innerHTML.slice(0, -1),
                discountTotal: +discount.innerHTML.slice(0, -1),
                amount: 1
            }

            // console.log(basketQuantity.innerHTML)
            basketQuantity.innerHTML++

            let longName = `${productBasket.name} - ${productBasket.color} - ${productBasket.size}`

            popupAdd.firstElementChild.firstElementChild.innerHTML = productBasket.name
            popupAddColor.firstElementChild.innerHTML = productBasket.color
            popupAddSize.firstElementChild.innerHTML = productBasket.size


            popupAdd.classList.add('active')

            let prod = localStorage.getItem(longName)
            if (!prod) {
                localStorage.setItem(longName, JSON.stringify(productBasket))
            } else {
                prod = JSON.parse(prod)
                prod.amount++
                prod.firstPriceTotal = +(prod.firstPriceTotal + prod.firstPrice).toFixed(2)
                prod.priceTotal = +(prod.priceTotal + prod.price).toFixed(2)
                prod.discountTotal = +(prod.discountTotal + prod.discount).toFixed(2)

                localStorage.setItem(longName, JSON.stringify(prod))

            }



            // localStorage.setItem('product')
        }
    })

}


if (localStorage.length === 0) {
    if (+basketQuantity.innerHTML !== 0) {
        basketQuantity.innerHTML = 0
    }
} else {

    for (let i = 0; i < localStorage.length; i++) {
        let item = localStorage.key(i)
        let objectProduct = JSON.parse(localStorage.getItem(item))
        basketNumber += +objectProduct.amount
    }
    basketQuantity.innerHTML = basketNumber
}

if (locationFile === '/basket.html') {
    // localStorage.removeItem('Dogecoin To The Moon - Black - M')
    if (localStorage.length > 0) {

        let basketNull = document.querySelector('.basket_null')
        let basketMain = document.querySelector('.main_basket')
        if (!basketNull.classList.contains('active')) {
            basketNull.classList.add('active')
        }
        if (!basketMain.classList.contains('active')) {
            basketMain.classList.add('active')
        }

        let totalPriceElement = document.querySelector('.pay_container-price-number')
        let totalDiscountElement = document.querySelector('.pay_container-discount-number')

        let basketWrapper = document.querySelector('.basket_wrapper')
        function createDiv(object, longName) {
            let oneBasket = document.createElement('div')
            oneBasket.className = 'basket_one'
            oneBasket.id = longName
            oneBasket.innerHTML =
                `<div class="basket_one-image">
                <img src=${object.image} alt="" width="100%">
            </div>
            <div class="basket_one-info">
                <div class="basket_one-info-text">${object.name}</div>
                <div class="basket_one-info-cs">
                    <div class="basket_one-info-color">Color: ${object.color}</div>
                    <div class="basket_one-info-size">Size: ${object.size}</div>
                </div>
                <div class="basket_one-info-price">
                    <div class="basket_one-info-price-first">${object.firstPriceTotal}$</div> <div>${object.priceTotal}$</div>
                </div>
            </div>
            <div class="basket_one-number">
                <div>${object.amount}</div>
                <div class="basket_one-number-minus basket_symbol">
                    <div class="minus-image">
                        <img src="images/Minus.png" alt="" width="100%">
                    </div>
                </div>
                <div class="basket_one-number-plus basket_symbol active">
                    <div class="plus-image">
                        <img src="images/Plus.png" alt="" width="100%">
                    </div>
                </div>
            </div>
            <div class="basket_one-remove">
                Remove
            </div>`

            // popColorOne.innerHTML = 'Привет'
            basketWrapper.append(oneBasket)
        }
        let totalPrice = 0
        let totalDiscount = 0
        for (let i = 0; i < localStorage.length; i++) {
            let item = localStorage.key(i)
            let objectProduct = JSON.parse(localStorage.getItem(item))

            totalPrice = +(totalPrice + objectProduct.priceTotal).toFixed(2)
            totalDiscount = +(totalDiscount + objectProduct.discountTotal).toFixed(2)

            createDiv(objectProduct, item)
        }

        totalPriceElement.innerHTML = `${totalPrice}$`
        totalDiscountElement.innerHTML = `${totalDiscount}$`

        let basketMinus = document.querySelector('.basket_one-number-minus')


        document.addEventListener('click', (e) => {
            let target = e.target


            if (target.closest('.basket_one-number-plus')) {
                let elem = target.closest('.basket_one-number-plus')
                elem.parentNode.firstElementChild.innerHTML++
                if (!basketMinus.classList.contains('active')) {
                    basketMinus.classList.add('active')
                }

                let basketOne = target.closest('.basket_one')

                let nameShirt = basketOne.id
                console.log(nameShirt)
                let prod = JSON.parse(localStorage.getItem(nameShirt))

                let firstPriceTotalElement = +basketOne.children[1].lastElementChild.firstElementChild.innerHTML.slice(0, -1)

                let priceTotalElement = +basketOne.children[1].lastElementChild.lastElementChild.innerHTML.slice(0, -1)



                // console.log(basketOne.children[1].lastElementChild.firstElementChild.innerHTML)

                basketOne.children[1].lastElementChild.firstElementChild.innerHTML = (firstPriceTotalElement + +prod.firstPrice).toFixed(2) + '$'

                basketOne.children[1].lastElementChild.lastElementChild.innerHTML = (priceTotalElement + +prod.price).toFixed(2) + '$'

                console.log(totalPrice)
                console.log(+prod.price)
                console.log(totalPrice + +prod.price)

                totalPrice = +(totalPrice + +prod.price).toFixed(2)


                totalDiscount = +(totalDiscount + +prod.discount).toFixed(2)

                totalPriceElement.innerHTML = `${totalPrice}$`
                totalDiscountElement.innerHTML = `${totalDiscount}$`


                basketQuantity.innerHTML++

                prod.amount++
                prod.firstPriceTotal = +(prod.firstPriceTotal + prod.firstPrice).toFixed(2)
                prod.priceTotal = +(prod.priceTotal + prod.price).toFixed(2)
                prod.discountTotal = +(prod.discountTotal + prod.discount).toFixed(2)

                localStorage.setItem(nameShirt, JSON.stringify(prod))



            }

            if (target.closest('.basket_one-number-minus')) {
                let elem = target.closest('.basket_one-number-minus')
                if (+elem.parentNode.firstElementChild.innerHTML > 1) {
                    elem.parentNode.firstElementChild.innerHTML--
                    if (+elem.parentNode.firstElementChild.innerHTML === 1) {
                        basketMinus.classList.remove('active')
                    }





                    let basketOne = target.closest('.basket_one')

                    let nameShirt = basketOne.id
                    let prod = JSON.parse(localStorage.getItem(nameShirt))

                    let firstPriceTotalElement = +basketOne.children[1].lastElementChild.firstElementChild.innerHTML.slice(0, -1)

                    let priceTotalElement = +basketOne.children[1].lastElementChild.lastElementChild.innerHTML.slice(0, -1)


                    basketOne.children[1].lastElementChild.firstElementChild.innerHTML = (firstPriceTotalElement - +prod.firstPrice).toFixed(2) + '$'

                    basketOne.children[1].lastElementChild.lastElementChild.innerHTML = (priceTotalElement - +prod.price).toFixed(2) + '$'



                    totalPrice = +(totalPrice - +prod.price).toFixed(2)
                    totalDiscount = +(totalDiscount - +prod.discount).toFixed(2)

                    totalPriceElement.innerHTML = `${totalPrice}$`
                    totalDiscountElement.innerHTML = `${totalDiscount}$`

                    basketQuantity.innerHTML--

                    prod.amount--
                    prod.firstPriceTotal = +(prod.firstPriceTotal - prod.firstPrice).toFixed(2)
                    prod.priceTotal = +(prod.priceTotal - prod.price).toFixed(2)
                    prod.discountTotal = +(prod.discountTotal - prod.discount).toFixed(2)

                    localStorage.setItem(nameShirt, JSON.stringify(prod))





                }
            }


            if (target.closest('.basket_one-remove')) {
                let basketOne = target.closest('.basket_one')

                let nameShirt = basketOne.id
                let prod = JSON.parse(localStorage.getItem(nameShirt))

                basketOne.remove()


                localStorage.removeItem(nameShirt)

                if (localStorage.length > 0) {
                    totalPrice = +(totalPrice - +prod.priceTotal).toFixed(2)
                    totalDiscount = +(totalDiscount - +prod.discountTotal).toFixed(2)

                    totalPriceElement.innerHTML = `${totalPrice}$`
                    totalDiscountElement.innerHTML = `${totalDiscount}$`

                    basketQuantity.innerHTML -= +prod.amount
                } else {
                    basketNull.classList.remove('active')

                    basketMain.classList.remove('active')

                    basketQuantity.innerHTML = 0
                }

            }
        })


    }
}



