require 'test_helper'

class NotesControllerTest < ActionController::TestCase

  def setup
    @user1 = User.create(:email => "user1@user1.com",
                         :password=>"user3@user3.com",
                         :password_confirmation => "user3@user3.com")
    @id = Note.first.id
  end

  def teardown
    @user1.destroy
  end

  test "create without being logged in" do
  	post :create, { 'note' => { 
  					'title' => 'bla', 
  					'due' => DateTime.new(2001,2,3),
  					'content' => 'sfjiajsfasf'
  				}
  			}
  	assert_response 500
  end

  test "show without being logged in" do 
  	get :show, { 'id' => @id }
  	assert_response 404
  end

  test "update without being logged in" do
  	put :update, {
  		'id' => @id,
  		'note' => {
  			'title' => 'changed'
  		}
  	}
  	assert_response 404
  end

  test "delete without permission" do
  	delete :destroy, { 'id' => @id }
  	assert_response 404
  end

  test "view index without being logged in" do
  	get :index
  	assert_response 404
  end
end
