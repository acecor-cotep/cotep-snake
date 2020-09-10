class Score
{
		constructor() 
		{ 
			this.scores = []; 
			this.total = 0; 
		} 
	  
		// push element into the scores 
		push(points)
		{
			this.scores.push(points);
			this.total += 10;
		} 

		// return top most element in the stack and removes it from the stack 
		pop() 
		{
			if (this.scores.length > 0) {
				this.total -= 10;
				return (this.scores.pop());
			}
		}

		// retourne vrai si la stack is empty 
		isEmpty() 
		{ 
			return (this.scores.length == 0); 
		}

		// trie du plus grand au plus petit
		sort() {
			this.scores.sort((a, b) => a - b).reverse();
		}

		printStack() {
			var str = ""; 
			for (var i = 0; i < this.scores.length; i++) 
				str += this.scores[i] + " "; 
			return (str); 
		} 

	
}