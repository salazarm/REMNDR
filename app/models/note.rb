class Note < ActiveRecord::Base
  attr_accessible :content, :due, :title, :user_id

  validates_presence_of :title, :due, :user_id
  validates :title, :length => (0..40)

  def to_json(option = {})
  	super(option.merge(:only => [ :id, :title, :due, :content, :created_at ]))
  end
end
