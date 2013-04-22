require 'test_helper'

class SessionsControllerTest < ActionController::TestCase
  
  test "wrong login info" do
  	post :create , :email => "test@test.com", 
  		:password => "testing"
  	assert_response 404
  end

  test "correct login info" do
		@user1 = User.create(:email => "user1@user1.com",
                 :password=>"user3@user3.com",
                 :password_confirmation => "user3@user3.com")
		post :create, :email => "user1@user1.com",
				  :password => "user3@user3.com"
		@user1.destroy
		assert_response 200
  end
end
