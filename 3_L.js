// Liskov Substitution - Принцип подстановки Барбары Лисков

// *********************************************
// Нарушение принципа. Один человек. Все классы, относящиеся
// к человеку, имеют разную логику. Но человек может быть
// частью компании, а может быть из др. компании
// class Person {
// 	access() {
// 		console.log('You have an access')
// 	}
// }

// class Frontend extends Person {
// 	canCreateLayout() {}
// }

// class Backend extends Person {
// 	canCreateServer() {}
// }

// class PersonFromOtherCompany extends Person {
// 	access() {
// 		console.log('Access is denied')
// 	}
// }

// //
// function openSecretKey(person) {
// 	person.access()
// }

// openSecretKey(new Frontend())
// openSecretKey(new Backend())


// *********************************************
// Принцип соблюдается, когда наследование происходит от
// абстракции базового класса

class Person {

	}

class MemberOfCurrentCompany extends Person {
	access() {
		console.log('You have an access')
	}
}

class Guest extends Person {
	isGuest = true
}

class Frontend extends MemberOfCurrentCompany {
	canCreateLayout() {}
}

	class Backend extends MemberOfCurrentCompany {
		canCreateServer() {}
	}

	class PersonFromOtherCompany extends Guest {
		access() {
			console.log('Access is denied')
		}
	}

	//
	function openSecretKey(member) {
		member.access()
	}

	openSecretKey(new Frontend())
	openSecretKey(new Backend())
	openSecretKey(new PersonFromOtherCompany())

	// *********************************************
	// Пример 2
	// *********************************************
	class Component {
		isComponent = true
	}

	class ComponentWithTemplate extends Component {
		render() {
			return `<div>Component</div>`
		}
	}

	class HigherOrderComponent extends Component {

	}

	class HeaderComponent extends ComponentWithTemplate {
		onInit() {}
	}

	class FooterComponent extends ComponentWithTemplate {
		afterInit() {}
	}

	// компонент высокого порядка не имеет метода render, принимает на входе один компонент и возвращает уже модифицированный класс
	class HOC extends HigherOrderComponent {
		render() {
			throw new Error('Render is impossible here')
		}

		wrapComponent(component) {
			component.wrapped = true
			return component
		}
	}

	function renderComponent(component) {
		console.log(component.render())
	}

	renderComponent(new HeaderComponent())
	renderComponent(new FooterComponent())
