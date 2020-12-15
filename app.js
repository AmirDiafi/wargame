const player = document.querySelector('#player')
const targets = document.querySelectorAll('.target')

// Player
class Player {
	constructor(shape, offsetLeft) {
		this.shape = shape
		this.offsetLeft = offsetLeft
	}
	moveLeft() {
		if (this.offsetLeft >= 20) {
			this.offsetLeft -= 1
			this.shape.style.left = this.offsetLeft + 'px'
		}
	}
	moveRight() {
		if (this.offsetLeft < window.innerWidth - this.shape.clientWidth - 20) {
			this.offsetLeft += 1
			this.shape.style.left = this.offsetLeft + 'px'
		}
	}
}

// Gun
class Shot {
	shotup() {
		let offsetTop = 50
		const shape = document.createElement('div')
		shape.setAttribute('id', 'shot')
		player.appendChild(shape)
		shape.style.left =
			shape.offsetLeft + player.offsetWidth / 2 - shape.offsetWidth / 2 + 'px'
		const moveup = setInterval(() => {
			offsetTop += 20
			shape.style.bottom = offsetTop + 'px'
			targets.forEach((target) => {
				if (target.classList.contains('target')) {
					if (
						shape.offsetLeft === target.offsetLeft &&
						shape.offsetTop - (shape.offsetTop % 20) ===
							target.offsetTop - (target.offsetTop % 20)
					) {
						offsetTop -= 40
						shape.style.bottom = offsetTop + 'px'
						clearInterval(moveup)
						setTimeout(() => {
							shape.remove()
							target.classList.remove('target')
							target.classList.add('shoted')
						}, 1000)
					}
				}
			})
			if (shape.offsetTop < 0) {
				shape.remove()
				clearInterval(moveup)
			}
		}, 100)
	}
}

class Target {
	constructor(shape, offsetTop) {
		this.shape = shape
		this.offsetTop = offsetTop
	}
}
const newPlayer = new Player(player, player.offsetLeft)
const newShot = new Shot()
window.addEventListener('keydown', function (e) {
	// console.log(e.key)
	if (e.key === 'ArrowLeft') {
	} else if (e.key === 'ArrowRight') {
		newPlayer.moveRight()
	}
	switch (e.key) {
		case 'ArrowLeft':
			newPlayer.moveLeft()
			break
		case 'ArrowRight':
			newPlayer.moveRight()
			break
		case 'ArrowUp':
			newShot.shotup()
			break

		default:
			break
	}
})
