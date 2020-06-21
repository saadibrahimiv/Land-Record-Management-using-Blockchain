class MyCar 

	attr_accessor :color 
	attr_writer :year 


	def initialize year, color, model 
		@year = year 
		@color = color 
		@model = model
		@cur_speed = 0  
	end

	def speedUp(n)
		@cur_speed += n  
	end

	def brake(n)
		@cur_speed -= n 
	end

	def shutOff
		@cur_speed = 0 
	end

	def current_speed
		@cur_speed 
	end

	def spray_paint(paint) 
		self.color = paint 
	end

end
