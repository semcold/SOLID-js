// Single Responsibility (Принцип единой ответственности)


// *******************************************

// Нарушение принципа, т.к. класс News будет постепенно
// расширяться, но методы toHTML и toJSON не привязаны
// конкретно к News, они отвечают за отображение

// class News {
// 	constructor(title, text) {
// 		this.title = title
// 		this.text = text
// 		this.modified = false
// 	}

// 	update(text) {
// 		this.text = text
// 		this.modified = true
// 	}

// 	toHTML() {
// 		return `
// 			<div class="news">
// 				<h1>${this.title}</h1>
// 				<p>${this.text}</p>
// 			</div>
// 		`
// 	}

// 	toJSON() {
// 		return JSON.stringify({
// 			title: this.title,
// 			text: this.text,
// 			modified: this.modified
// 		}, null, 2) // format json with 2 spaces
// 	}
// }

// const news = new News('COVID-19 мутировал', 'Теперь новым ковидом заболели все на планете, даже те, кто болел первой версией')
// console.log(news.toHTML())
// console.log(news.toJSON())

// *******************************************

// Как следует вести код, соблюдая принцип

class News {
	// оставляем только функционал для News, сохраняя
	// абстрактную оболочку, кот. отвечает за логику
	constructor(title, text) {
		this.title = title
		this.text = text
		this.modified = false
	}

	update(text) {
		this.text = text
		this.modified = true
	}
}
// Класс, отвечающий за формат новостей к определенным форматам (за отображение)
class NewsPrinter {
	constructor(news) {
		this.news = news
	}

	html() {
		return `
 			<div class="news">
 				<h1>${this.news.title}</h1>
 				<p>${this.news.text}</p>
			 </div>
			`
		}
	json() {
		return JSON.stringify({
			title: this.news.title,
			text: this.news.text,
			modified: this.news.modified
		}, null, 2) // format json with 2 spaces
	}

	// Т.о. класс можно расширять, добавляя дополнительные возможности для другого типа отображений

	xml() {
		return `
			<news>
				<title>${this.news.title}</title>
				<text>${this.news.text}</text>
			</news>
		`
	}
}

const printer = new NewsPrinter(
	new News('COVID-19 мутировал', 'Теперь новым ковидом заболели все на планете, даже те, кто болел первой версией')
	)

console.log(printer.html())
console.log(printer.json())
console.log(printer.xml())

// Логика декомпозирована => принцип единой ответственности соблюдается
