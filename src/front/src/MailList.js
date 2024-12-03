import axios from "axios";
import { useRef, useState } from "react";

function MailList() {

  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const toInput = useRef();
  const ccInput = useRef();
  const bccInput = useRef();
  const subjectInput = useRef();
  const messageInput = useRef();

  function saveTo() {
    setTo(toInput.current.value);
  }
  function saveCc() {
    setCc(ccInput.current.value);
  }
  function saveBcc() {
    setBcc(bccInput.current.value);
  }
  function saveSubject() {
    setSubject(subjectInput.current.value);
  }
  function saveMessage() {
    setMessage(messageInput.current.value);
  }

  const closeBtn = useRef();

  const sendEmail = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      'senderEmail': 'melong4609@gmail.com',
      'senderName': '테스트',
      "receivedEmail": to,
      'title': subject,
      'content': message
    }

    // if(!to) {
    //   alert('받으실 분의 메일주소를 입력해주세요.');
    //   return;
    // }
    // if(!to.includes('@')) {
    //   alert('받으실 분의 메일주소를 정확히 입력해주세요.');
    //   return;
    // }
    // if(!message) {
    //   alert('내용을 입력해주세요.');
    //   return;
    // }

    axios.post("http://localhost:8080/api/mail/sendEmail", data).then(
        response => {
          console.log(response)
          closeBtn.current.click();
        }
    ).catch(
        error => {
          console.log(error)
          alert('메일 전송에 실패하였습니다.');
        }
    );
  }

  return (
    <div className="App">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="grid email">
              <div class="grid-body">
                <div class="row">
                  <div class="col-md-3">
                    <h2 class="grid-title">
                      <i class="fa fa-inbox"></i> Inbox
                    </h2>
                    <a
                      class="btn btn-block btn-primary"
                      data-toggle="modal"
                      data-target="#compose-modal"
                    >
                      <i class="fa fa-pencil"></i>&nbsp;&nbsp;NEW MESSAGE
                    </a>

                    <hr />

                    <div>
                      <ul class="nav nav-pills nav-stacked">
                        <li class="header">Folders</li>
                        <li class="active">
                          <a href="#">
                            <i class="fa fa-inbox"></i> Inbox (14)
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa fa-star"></i> Starred
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa fa-bookmark"></i> Important
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa fa-mail-forward"></i> Sent
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa fa-pencil-square-o"></i> Drafts
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa fa-folder"></i> Spam (217)
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="col-md-9">
                    <div class="row">
                      <div class="col-sm-6">
                        <label style={{ marginRight: "8px" }} class="">
                          <div
                            class="icheckbox_square-blue"
                            style={{ position: "relative" }}
                          >
                            <input
                              type="checkbox"
                              id="check-all"
                              class="icheck"
                            />
                            <ins class="iCheck-helper"></ins>
                          </div>
                        </label>
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn btn-default dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            Action <span class="caret"></span>
                          </button>
                          <ul class="dropdown-menu" role="menu">
                            <li>
                              <a href="#">Mark as read</a>
                            </li>
                            <li>
                              <a href="#">Mark as unread</a>
                            </li>
                            <li>
                              <a href="#">Mark as important</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                              <a href="#">Report spam</a>
                            </li>
                            <li>
                              <a href="#">Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div class="col-md-6 search-form">
                        <form action="#" class="text-right">
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control input-sm"
                              placeholder="Search"
                            />
                            <span class="input-group-btn">
                              <button
                                type="submit"
                                name="search"
                                class="btn_ btn-primary btn-sm search"
                              >
                                <i class="fa fa-search"></i>
                              </button>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div class="padding"></div>

                    <div class="table-responsive">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td class="action">
                              <input type="checkbox" />
                            </td>
                            <td class="action">
                              <i class="fa fa-star-o"></i>
                            </td>
                            <td class="action">
                              <i class="fa fa-bookmark-o"></i>
                            </td>
                            <td class="name">
                              <a href="#">Larry Gardner</a>
                            </td>
                            <td class="subject">
                              <a href="#">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed{" "}
                              </a>
                            </td>
                            <td class="time">08:30 PM</td>
                          </tr>
                          <tr>
                            <td class="action">
                              <input type="checkbox" />
                            </td>
                            <td class="action">
                              <i class="fa fa-star-o"></i>
                            </td>
                            <td class="action">
                              <i class="fa fa-bookmark"></i>
                            </td>
                            <td class="name">
                              <a href="#">Larry Gardner</a>
                            </td>
                            <td class="subject">
                              <a href="#">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed{" "}
                              </a>
                            </td>
                            <td class="time">08:30 PM</td>
                          </tr>
                          <tr class="read">
                            <td class="action">
                              <input type="checkbox" />
                            </td>
                            <td class="action">
                              <i class="fa fa-star"></i>
                            </td>
                            <td class="action">
                              <i class="fa fa-bookmark"></i>
                            </td>
                            <td class="name">
                              <a href="#">Larry Gardner</a>
                            </td>
                            <td class="subject">
                              <a href="#">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed{" "}
                              </a>
                            </td>
                            <td class="time">08:30 PM</td>
                          </tr>
                          <tr>
                            <td class="action">
                              <input type="checkbox" />
                            </td>
                            <td class="action">
                              <i class="fa fa-star-o"></i>
                            </td>
                            <td class="action">
                              <i class="fa fa-bookmark-o"></i>
                            </td>
                            <td class="name">
                              <a href="#">Larry Gardner</a>
                            </td>
                            <td class="subject">
                              <a href="#">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed{" "}
                              </a>
                            </td>
                            <td class="time">08:30 PM</td>
                          </tr>
                          <tr class="read">
                            <td class="action">
                              <input type="checkbox" />
                            </td>
                            <td class="action">
                              <i class="fa fa-star-o"></i>
                            </td>
                            <td class="action">
                              <i class="fa fa-bookmark-o"></i>
                            </td>
                            <td class="name">
                              <a href="#">Larry Gardner</a>
                            </td>
                            <td class="subject">
                              <a href="#">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed{" "}
                              </a>
                            </td>
                            <td class="time">08:30 PM</td>
                          </tr>
                          <tr class="read">
                            <td class="action">
                              <input type="checkbox" />
                            </td>
                            <td class="action">
                              <i class="fa fa-star-o"></i>
                            </td>
                            <td class="action">
                              <i class="fa fa-bookmark"></i>
                            </td>
                            <td class="name">
                              <a href="#">Larry Gardner</a>
                            </td>
                            <td class="subject">
                              <a href="#">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed{" "}
                              </a>
                            </td>
                            <td class="time">08:30 PM</td>
                          </tr>
                          <tr>
                            <td class="action">
                              <input type="checkbox" />
                            </td>
                            <td class="action">
                              <i class="fa fa-star"></i>
                            </td>
                            <td class="action">
                              <i class="fa fa-bookmark-o"></i>
                            </td>
                            <td class="name">
                              <a href="#">Larry Gardner</a>
                            </td>
                            <td class="subject">
                              <a href="#">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed{" "}
                              </a>
                            </td>
                            <td class="time">08:30 PM</td>
                          </tr>
                          <tr>
                            <td class="action">
                              <input type="checkbox" />
                            </td>
                            <td class="action">
                              <i class="fa fa-star-o"></i>
                            </td>
                            <td class="action">
                              <i class="fa fa-bookmark-o"></i>
                            </td>
                            <td class="name">
                              <a href="#">Larry Gardner</a>
                            </td>
                            <td class="subject">
                              <a href="#">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed{" "}
                              </a>
                            </td>
                            <td class="time">08:30 PM</td>
                          </tr>
                          <tr class="read">
                            <td class="action">
                              <input type="checkbox" />
                            </td>
                            <td class="action">
                              <i class="fa fa-star"></i>
                            </td>
                            <td class="action">
                              <i class="fa fa-bookmark"></i>
                            </td>
                            <td class="name">
                              <a href="#">Larry Gardner</a>
                            </td>
                            <td class="subject">
                              <a href="#">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed{" "}
                              </a>
                            </td>
                            <td class="time">08:30 PM</td>
                          </tr>
                          <tr>
                            <td class="action">
                              <input type="checkbox" />
                            </td>
                            <td class="action">
                              <i class="fa fa-star"></i>
                            </td>
                            <td class="action">
                              <i class="fa fa-bookmark-o"></i>
                            </td>
                            <td class="name">
                              <a href="#">Larry Gardner</a>
                            </td>
                            <td class="subject">
                              <a href="#">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed{" "}
                              </a>
                            </td>
                            <td class="time">08:30 PM</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <ul class="pagination">
                      <li class="disabled">
                        <a href="#">«</a>
                      </li>
                      <li class="active">
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">4</a>
                      </li>
                      <li>
                        <a href="#">5</a>
                      </li>
                      <li>
                        <a href="#">»</a>
                      </li>
                    </ul>
                  </div>

                  <div
                    class="modal fade"
                    id="compose-modal"
                    tabindex="-1"
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div class="modal-wrapper">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header bg-blue">
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-hidden="true"
                              ref={closeBtn}
                            >
                              ×
                            </button>
                            <h4 class="modal-title">
                              <i class="fa fa-envelope"></i> Compose New Message
                            </h4>
                          </div>
                          <form action="#" method="post">
                            <div class="modal-body">
                              <div class="form-group">
                                <input
                                  name="to"
                                  type="email"
                                  class="form-control"
                                  placeholder="To"
                                  ref={toInput}
                                  onChange={saveTo}
                                />
                              </div>
                              <div class="form-group">
                                <input
                                  name="cc"
                                  type="email"
                                  class="form-control"
                                  placeholder="Cc"
                                  ref={ccInput}
                                  onChange={saveCc}
                                />
                              </div>
                              <div class="form-group">
                                <input
                                  name="bcc"
                                  type="email"
                                  class="form-control"
                                  placeholder="Bcc"
                                  ref={bccInput}
                                  onChange={saveBcc}
                                />
                              </div>
                              <div class="form-group">
                                <input
                                  name="subject"
                                  type="email"
                                  class="form-control"
                                  placeholder="Subject"
                                  ref={subjectInput}
                                  onChange={saveSubject}
                                />
                              </div>
                              <div class="form-group">
                                <textarea
                                  name="message"
                                  id="email_message"
                                  class="form-control"
                                  placeholder="Message"
                                  ref={messageInput}
                                  onChange={saveMessage}
                                  style={{ height: "120px" }}
                                ></textarea>
                              </div>
                              <div class="form-group">
                                {" "}
                                <input type="file" name="attachment" />
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-default"
                                data-dismiss="modal"
                              >
                                <i class="fa fa-times"></i> Discard
                              </button>
                              <button
                                // type="submit"
                                onClick={sendEmail}
                                class="btn btn-primary pull-right"
                              >
                                <i class="fa fa-envelope"></i> Send Message
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MailList;
