//Class Vector2D
class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	//Adds A Vector To The Instance Vector
	add(vector) {
		let x = this.x + vector.x;
		let y = this.y + vector.y;
		return new Vector2D(x, y);
	}

	//Subtracts A Vector To The Instance Vector
	sub(vector) {
		let x = this.x - vector.x;
		let y = this.y - vector.y;
		return new Vector2D(x, y);
	}

	//Multiplies The Vector By A Scalar Or Another Vector
	mul(arg) {
		if (arg instanceof Vector2D) {
			let x = this.x * arg.x;
			let y = this.y * arg.y;
			return new Vector2D(x, y);
		} else {
			let x = this.x * arg;
			let y = this.y * arg;
			return new Vector2D(x, y);
		}
	}

	//Divides The Vector By A Scalar
	div(num) {
		let x = this.x / num;
		let y = this.y / num;
		return new Vector2D(x, y);
	}

	//Returns The Module Of The Vector
	abs() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	//Calculates The Distance Of Two Points
	dist(vector) {
		let vec = this.sub(vector);
		return vec.abs();
	}

	//Calculates The Distance Of Two Points Squared (More Efficient) Thanks Two Quid ^^
	squaredDist(vector) {
		let vec = this.sub(vector);
		return vec.x ** 2 + vec.y ** 2;
	}

	//Returns A Vector That Has The Same Direction As The Instance But Has Module 1
	norm() {
		return new Vector2D(this.x / this.abs(), this.y / this.abs());
	}

	//Returns The Max Value Of A Vector, Max Value Specified By The Parameter
	max(num) {
		let x = (num * this.x) / this.abs();
		let y = (num * this.y) / this.abs();
		return new Vector2D(x, y);
	}
}
