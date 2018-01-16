<?php include 'style.php' ?> 
          

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if(isset($_POST['submit'])) {

    $name = $_POST['name'];
    $email = $_POST['email']; 
    $mobile = $_POST['mobile'];
    $nic = $_POST['nic'];
    $job_id = $_POST['job_id'];
    $message = $_POST['message']; 
    $applicant_cv_file = $_POST['applicant_cv_file']; 


$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'sachini@innovay.com';                 // SMTP username
    $mail->Password = 'd4598bill@157AB';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients

    $mail->setFrom($email);
    // $mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
    $mail->addAddress('sachini@innovay.com');               // Name is optional
    $mail->addReplyTo($email);
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Hiring Details';
    $mail->Body    = 'Name:'.$name.'<br>E-mail: '.$email.'<br>Telephone No:'.$mobile.
                    '<br>NIC No:'. $nic.'<br>Job Title:'.$job_id.'<br>Message:'.$message.
                    '<br>Resume:'.$applicant_cv_file.'';
    // $mail->AltBody = '';

    $mail->send();
    echo '<div class="alert alert-success">
  <strong>Success!</strong> Message has been sent.
</div>';
} catch (Exception $e) {
    echo '<div class="alert alert-warning">
  <strong>Error!</strong> Message could not be sent.
</div>';
    echo '<div class="alert alert-warning">
  <strong>Error!</strong>Mailer Error: </div> ' . $mail->ErrorInfo;
}
}