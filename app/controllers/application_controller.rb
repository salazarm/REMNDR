class ApplicationController < ActionController::Base  
  protect_from_forgery  
  before_filter :current_user
  

  # Checks for a valid auth token corresponding to a user or
  # creates a temporary user if one is missing.
  private  
  def current_user
    @cur_user = false
    unless cookies[:auth_token].nil?
      # If there is a session
      @cur_user ||= User.find_by_auth_token(
      	cookies[:auth_token])
    end
  end  


  helper_method :current_user
end 