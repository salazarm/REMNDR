class NotesController < ApplicationController
	include ApplicationHelper

	def index
		if @cur_user
			render :json => @cur_user.notes
		else
			render :json => {}, :status => 404
		end
	end

	def show
		if @cur_user
			note = Note.find(params[:id])
			if can_edit?(note)
				render :json => note
			else
				render :json => {}, :status => 404
			end
		else
			render :json => {}, :status => 404
		end
	end

	def create
		if @cur_user
			note = @cur_user.notes.create! params[:note]
			render :json => note
		else
			render :json => {}, :status => 500
		end
	end

	def update
		note = Note.find_by_id(params[:id])

		if @cur_user && note
			if !can_edit?(note)
				render :json => {}, :status => 404
			elsif note.update_attributes(params[:note])
				render :json => note, :status => 200
			else
				render :json => {}, :status => 500
			end
		else
			render :json => {}, :status => 404
		end
	end

	def destroy
		if @cur_user
			note = Note.find_by_id(params[:id]) 
			if  note && !can_edit?(note)
				render :status => 404
			elsif note
				note.destroy
				render :json => {:msg => "item deleted!"},:status => 200
			end
		else
			render :json => {:msg => "could not find that reminder!"}, :status => 404
		end
	end
end
