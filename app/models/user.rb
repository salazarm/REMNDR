class User < ActiveRecord::Base
  VALID_EMAIL_REGEX = /^.+@.+\..+$/i 
  WELCOME_MESSAGE = ""\
  "Welcome to REMNDR! \n\nYou can click the tabs above, '"\
  "Today', 'Tomorrow', 'Week', and 'All Time', to see which reminders "\
  "you have set for those time periods! \n\nIf you have any suggestions "\
  "for features or the UI send me a message at salazarmlist@mit.edu !"\
  "\n\nHave fun being reminded! ;-)"


  attr_accessible :password, :password_confirmation, :email, :auth_token
  attr_accessor :password, :password_confirmation

  before_create { generate_token(:auth_token) }
  
  before_validation :downcase_email

  validates_presence_of :email, :password, :password_confirmation, 
                          :on => :create 
  
  validates :password, :length => (6..32), 
                       :confirmation => true, 
                       :if => :setting_password?

  validates :email, :uniqueness => true, 
             :format => {:with => VALID_EMAIL_REGEX }

  after_create { first_reminder }

  has_many :notes

  HUMANIZED_ATTRIBUTES = {
    :password_digest => "Password"
  }

  def as_json(options={})
    super(:only => [:email, :id])
  end

  def password=(password_str)
    @password = password_str
    write_attribute(:password_salt,BCrypt::Engine.generate_salt)
    write_attribute(:password_digest,BCrypt::Engine.hash_secret(password_str, password_salt))
  end

  # Used to tell if we need to validate the password
  def setting_password?
    self.password || self.password_confirmation
  end
 
  # Checks if the user provided the correct password
  def authenticate(password)
    password.present? && password_digest.present? && password_digest == BCrypt::Engine.hash_secret(password, password_salt)
  end

  # Authorization token for validating user
  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column]) 
  end

  def first_reminder
    self.notes.create(:title => "Welcome!", :content => WELCOME_MESSAGE, :due => 2.hours.from_now )
  end
  # Overrides humanized attribute names
  def self.human_attribute_name(attr, options={})
    HUMANIZED_ATTRIBUTES[attr.to_sym] || super
  end

  # Downcase email because emails are usually not case sensitive
  def downcase_email
    self.email = self.email.downcase if self.email.present?
  end

end
