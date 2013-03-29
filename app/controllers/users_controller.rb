class UsersController < ApplicationController
  def create
    user = User.new(params[:user])
    if user.save
      cookies[:auth_token] = user.auth_token
      respond_to do |format|
      	format.json { render :json => user , :only => ["id","email"]}
      end
    else
	      respond_to do |format|
			      format.json {render :json => user.errors, :status => 500}
		    end 
    end
  end
end
