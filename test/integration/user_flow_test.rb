require 'test_helper'

class UserFlowTest < ActionDispatch::IntegrationTest

  def setup
  	user = 	User.find_by_email("test@test.com")
  	if user
  		user.destroy
  	end
	  @user1 = User.create(:email => "user1@user1.com",
                         :password=>"user3@user3.com",
                         :password_confirmation => "user3@user3.com")
    @user2 = User.create(:email => "user2@user2.com",
                         :password => "user2@user2.com",
                         :password_confirmation => "user2@user2.com")
    # Sign in as @user1
    post '/sessions', :email => "user1@user1.com", :password => "user3@user3.com"
  end

  def teardown
    @user1.destroy
    @user2.destroy
  end


  test "update someone else's note" do 
  	note_id = @user2.notes.first.id


  	put '/notes/'+note_id.to_s, {
							  		:id => note_id,
							  		:note =>{
							  				"title" => "test",
							  				"content" => "test"
							  		}
		  						}

  	assert_response 404

  	note = Note.find_by_id(note_id)
  	assert_not_equal 'test', note.title
  	assert_not_equal 'test', note.content
  end

  test "delete someone else's note" do 
  	note_id = @user2.notes.first.id

  	delete '/notes/'+note_id.to_s

  	assert_response 404
  end

  test "update own note" do 
  	note_id = @user1.notes.first.id

  	put '/notes/'+note_id.to_s, {
							  		:note =>{
							  				"title" => "test",
							  				"content" => "test"
							  		}
		  						}

  	assert_response 200

  	note = Note.find_by_id(note_id)
  	assert_equal 'test', note.title
  	assert_equal 'test', note.content
  end

  test "delete own note" do 
  	note_id = @user1.notes.first.id

  	delete '/notes/'+note_id.to_s

  	assert_response 200
  end

  test "create note while logged in" do
  	post '/notes', { 'note' => { 
  					'title' => 'bla', 
  					'due' => DateTime.new(2001,2,3),
  					'content' => 'sfjiajsfasf'
  				}
  			}
  	assert_response 200

  	assert_equal 'bla' @user.notes[1].title
  end



end
	