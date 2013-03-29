module ApplicationHelper
	def newUser
		return User.new
	end

	def can_edit?(note)
		return note.user_id == @cur_user.id
	end
end
