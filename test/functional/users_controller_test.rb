require 'test_helper'

class UsersControllerTest < ActionController::TestCase

	test "create new user" do
  	post :create, {
  			 	:user => {
						:email => "test@test.com",
			  		:password => "testing", 
			  		:password_confirmation => "testing"
					} 
  		} 
  	assert_response 200
  end
end
