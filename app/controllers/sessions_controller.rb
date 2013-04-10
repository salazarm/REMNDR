class SessionsController < ApplicationController

	def create  
	  user = User.find_by_email(params[:email])  
	  if user && user.authenticate(params[:password]) 
	  	cookies[:auth_token] = user.auth_token
	  	render :json => user, :only => ["id" ,"email"], :status => 200
	  else
	  	render :json => {"Invalid Login" => "wrong email and/or password"}, :status => 404
	  end
	end  
  
  def destroy  
    cookies.delete(:auth_token)  
    respond_to do |format|
	    format.json {render :json => {:msg => "Logged Out!"}, :status => 200}
	end
  end 

end
