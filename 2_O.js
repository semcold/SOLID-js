// Open-Closed - принцип открытости и закрытости

// Рассчет площади всех описанных фигур

// *********************************************
// Пример, где нарушается принцип

// class Square {
// 	constructor(size) {
// 		this.type = 'square'
// 		this.size = size
// 	}
// }

// class Circle {
// 	constructor(radius) {
// 		this.type = 'circle'
// 		this.radius = radius
// 	}
// }

// // Принцип будет нарушаться каждый раз, когда придется
// // добавлять новые фигуры, например нам нужен Rectangle

// class Rectangle {
// 	constructor(width, height) {
// 		this.type = 'rectangle'
// 		this.width = width
// 		this.height = height
// 	}
// }


// class AreaCalculate {
// 	constructor(shapes = []) {
// 		this.shapes = shapes
// 	}

// 	sum() {
// 		return this.shapes.reduce((acc, shape) => {
// 			if (shape.type === 'circle') {
// 				acc += (shape.radius ** 2) * Math.PI
// 			} else if (shape.type === 'square') {
// 				acc += shape.size ** 2
// 				// в результате добавления новых фигур придется добавлять новые условия
// 			} else if (shape.type === 'rectangle') {
// 				acc += shape.width * shape.height
// 			}

// 			return acc
// 		}, 0)
// 	}
// }

// const calc = new AreaCalculate([
// 		new Square(10),
// 		new Circle(1),
// 		new Circle(5),
// 		new Rectangle(10, 20)
// 	])

// console.log(calc.sum())

// *********************************************
// Пример, где принцип соблюдается

// Необходимо создать один базовый класс, у которого будет
// метод, реализовывать который можно будет в дочерних классах
class Shape {
	// общий метод, который должен быть вызван для каждого из
	// класса, наследующегося от базового, т.к. логика
	// выссчитывания площади для каждой фигуры разная
	area() {
		// В случае, если в дочерних классах этот метод не будет
		// реализовываться, то выпадет ошибка
		throw new Error('Area method should be implemented')
	}
}

// Дочерние классы наследуются от родительского

class Square extends Shape{
	constructor(size) {
		super() // вызов родительского конструктора
		this.size = size
	}
	// логика для квадрата
	area() {
		return this.size ** 2
	}
}

class Circle extends Shape {
	constructor(radius) {
		super()
		this.radius = radius
	}

	area() {
		return (this.radius ** 2) * Math.PI
	}
}

class Rectangle extends Shape {
	constructor(width, height) {
		super()
		this.width = width
		this.height = height
	}

	area() {
		return this.width * this.height
	}
}

// В итоге реализация выссчитывания площади делегирована
// каждому из классов, т.о. можно добавлять любое кол-во новых фигур

class Triangle extends Shape {
	// прямоугольный треугольник
	constructor(a, b) {
		super()
		this.a = a
		this.b = b
	}

	area() {
		return (this.a * this.b) / 2
	}
}

// Таким образом этот класс открыт для расширений
class AreaCalculate {
	constructor(shapes = []) {
		this.shapes = shapes
	}

	// но закрыт для изменений, т.к. метод прописан один раз и больше его не трогаем
	sum() {
		return this.shapes.reduce((acc, shape) => {
			acc += shape.area()
			return acc
		}, 0)
	}
}

const calc = new AreaCalculate([
		new Square(10),
		new Circle(1),
		new Circle(5),
		new Rectangle(10, 20),
		new Triangle(10, 15)
	])

console.log(calc.sum())
