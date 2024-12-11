import axios from "axios";
import { useRef, useState, useEffect } from "react";
import {forEach} from "react-bootstrap/ElementChildren";

function MailList() {

  const [mailList, setMailList] = useState([]);
  const [mailCount, setMailCount] = useState([]);

  const tbody = useRef();

  const getMailList = function()  {

    const param =  {
      page: 1
    };

    const formData = new URLSearchParams();

    Object.keys(param).forEach(key => {
      formData.append(key, param[key]);
    });

    axios.post("http://localhost:8080/api/mail/getEmail", formData).then(
        response => {
          setMailList(response.data.mailList);
          setMailCount(response.data.count);
        }
    ).catch(
        error => {
          console.log(error);
        }
    )
  };

  useEffect(() => {
    getMailList();
  }, []);

  const bookmark = function(params) {
    axios.post("http://localhost:8080/api/mail/updEmail", params).then(
        response => {
          getMailList();
        }
    )
  };

  const important = function(params) {
    axios.post("http://localhost:8080/api/mail/updEmail", params).then(
        response => {
          getMailList();
        }
    )
  };

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
      "receiverEmail": to,
      'title': subject,
      'content': message
    }

    if(!to) {
      alert('받으실 분의 메일주소를 입력해주세요.');
      return;
    }
    if(!to.includes('@')) {
      alert('받으실 분의 메일주소를 정확히 입력해주세요.');
      return;
    }
    if(!message) {
      alert('내용을 입력해주세요.');
      return;
    }

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

  // 모달 세팅
  const [modalOption, setModalOption] = useState();
  const [mailItem, setMailItem] = useState({});
  function read() {
    setModalOption("read")
  }
  function write() {
    setModalOption("write");
  }

  const pageCount = mailCount/10;

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="grid email">
              <div className="grid-body">
                <div className="row">
                  <div className="col-md-3">
                    <h2 className="grid-title">
                      <i className="fa fa-inbox"></i> Inbox
                    </h2>
                    <a
                        className="btn btn-block btn-primary"
                        data-toggle="modal"
                        data-target="#compose-modal"
                        onClick={write}
                    >
                      <i className="fa fa-pencil"></i>&nbsp;&nbsp;NEW MESSAGE
                    </a>

                    <hr/>

                    <div>
                      <ul className="nav nav-pills nav-stacked">
                        <li className="header">Folders</li>
                        <li className="active">
                          <a href="#">
                            <i className="fa fa-inbox"></i> Inbox (14)
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-star"></i> Starred
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-bookmark"></i> Important
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-mail-forward"></i> Sent
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-pencil-square-o"></i> Drafts
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-folder"></i> Spam (217)
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-sm-6">
                        <label style={{marginRight: "8px"}} className="">
                          <div
                              className="icheckbox_square-blue"
                              style={{position: "relative"}}
                          >
                            <input
                                type="checkbox"
                                id="check-all"
                                className="icheck"
                            />
                            <ins className="iCheck-helper"></ins>
                          </div>
                        </label>
                        <div className="btn-group">
                          <button
                              type="button"
                              className="btn btn-default dropdown-toggle"
                              data-toggle="dropdown"
                          >
                            Action <span className="caret"></span>
                          </button>
                          <ul className="dropdown-menu" role="menu">
                            <li>
                              <a href="#">Mark as read</a>
                            </li>
                            <li>
                              <a href="#">Mark as unread</a>
                            </li>
                            <li>
                              <a href="#">Mark as important</a>
                            </li>
                            <li className="divider"></li>
                            <li>
                              <a href="#">Report spam</a>
                            </li>
                            <li>
                              <a href="#">Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-md-6 search-form">
                        <form action="#" className="text-right">
                          <div className="input-group">
                            <input
                                type="text"
                                className="form-control input-sm"
                                placeholder="Search"
                            />
                            <span className="input-group-btn">
                              <button
                                  type="submit"
                                  name="search"
                                  className="btn_ btn-primary btn-sm search"
                              >
                                <i className="fa fa-search"></i>
                              </button>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="padding"></div>

                    <div className="table-responsive">
                      <table className="table">
                        <tbody ref={tbody}>
                        {/*{setMailItemList()}*/}
                        {mailList.map((v, i) => (
                            <tr key={v.mailNo} id={v.mailNo} ref={(el) => {
                              // mailItem.current = el
                            }}>
                              <td className="action">
                                <input type="checkbox"/>
                              </td>
                              <td className="action important" onClick={(e) => {

                                const params = {
                                  mailNo: v.mailNo,
                                }

                                if (e.currentTarget.children[0].className.includes('-o')) {
                                  params['isImportant'] = true;
                                } else {
                                  params['isImportant'] = false;
                                }

                                const formData = new URLSearchParams();
                                Object.keys(params).forEach(key => {
                                  formData.append(key, params[key]);
                                })

                                important(formData)
                              }}>
                                {v.isImportant ? <i className="fa fa-star"></i> : <i className="fa fa-star-o"></i>}
                              </td>
                              <td className="action bookmark" onClick={(e) => {
                                const params = {
                                  mailNo: v.mailNo,
                                }

                                if (e.currentTarget.children[0].className.includes('-o')) {
                                  params['isBookmarked'] = true;
                                } else {
                                  params['isBookmarked'] = false;
                                }

                                const formData = new URLSearchParams();
                                Object.keys(params).forEach(key => {
                                  formData.append(key, params[key]);
                                })

                                bookmark(formData)
                              }}>
                                {v.isBookmarked ? <i className="fa fa-bookmark"></i> :
                                    <i className="fa fa-bookmark-o"></i>}
                              </td>
                              <td className="name">
                                <a href="#">{v.senderEmail}</a>
                              </td>
                              <td className="subject">
                                <p
                                    style={{"cursor": "pointer"}}
                                    onClick={() => {
                                      read();
                                      setMailItem(v)
                                    }}
                                    data-toggle="modal"
                                    data-target="#compose-modal"
                                >
                                  {v.content}
                                </p>
                              </td>
                              <td className="time">{v.receivedTime.substring(0, 10)}</td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>

                    <ul className="pagination">
                      <li>
                        <a href="#">«</a>
                      </li>
                      {
                        Array.from({ length: pageCount }).map((_, index) => (
                          <li className="active" key={index+1}>
                            <a href="#">{index+1}</a>
                          </li>
                        ))
                      }

                      {/*<li className="active">*/}
                      {/*<a href="#">1</a>*/}
                      {/*</li>*/}
                      {/*<li className="disabled">*/}
                      {/*  <a href="#">2</a>*/}
                      {/*</li>*/}
                      {/*<li>*/}
                      {/*  <a href="#">3</a>*/}
                      {/*</li>*/}
                      {/*<li>*/}
                      {/*  <a href="#">4</a>*/}
                      {/*</li>*/}
                      {/*<li>*/}
                      {/*  <a href="#">5</a>*/}
                      {/*</li>*/}
                      <li>
                        <a href="#">»</a>
                      </li>
                    </ul>
                  </div>

                  {/* 메일 작성 모달 */}
                  <div
                      className="modal fade"
                      id="compose-modal"
                      tabIndex="-1"
                      role="dialog"
                      // aria-hidden="true"
                  >
                    <div className="modal-wrapper">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header bg-blue">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                // aria-hidden="true"
                                ref={closeBtn}
                            >
                              ×
                            </button>
                            <h4 className="modal-title">
                              <i className="fa fa-envelope"></i> {modalOption == "write" ? ("Compose New Message") : ("Read Message")}
                            </h4>
                          </div>
                          {
                            modalOption == "write" ?
                                (<form action="#" method="post">
                                    <div className="modal-body">
                                      <div className="form-group">
                                        <input
                                            name="to"
                                            type="email"
                                            className="form-control"
                                            placeholder="To"
                                            ref={toInput}
                                            onChange={saveTo}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <input
                                            name="cc"
                                            type="email"
                                            className="form-control"
                                            placeholder="Cc"
                                            ref={ccInput}
                                            onChange={saveCc}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <input
                                            name="bcc"
                                            type="email"
                                            className="form-control"
                                            placeholder="Bcc"
                                            ref={bccInput}
                                            onChange={saveBcc}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <input
                                            name="subject"
                                            type="email"
                                            className="form-control"
                                            placeholder="Subject"
                                            ref={subjectInput}
                                            onChange={saveSubject}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <textarea
                                            name="message"
                                            id="email_message"
                                            className="form-control"
                                            placeholder="Message"
                                            ref={messageInput}
                                            onChange={saveMessage}
                                            style={{height: "120px"}}
                                        ></textarea>
                                      </div>
                                      <div className="form-group">
                                        {" "}
                                        <input type="file" name="attachment"/>
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                          type="button"
                                          className="btn btn-default"
                                          data-dismiss="modal"
                                      >
                                        <i className="fa fa-times"></i> Discard
                                      </button>
                                      <button
                                          // type="submit"
                                          onClick={sendEmail}
                                          className="btn btn-primary pull-right"
                                      >
                                        <i className="fa fa-envelope"></i> Send Message
                                      </button>
                                    </div>
                                  </form>)
                                :
                            (
                                <div className="read_mail_modal">
                                  <table>
                                    <tr>
                                      <td className="modal_subject">보낸 사람</td>
                                      <td>{mailItem.senderEmail} ({mailItem.senderName})</td>
                                    </tr>
                                    <tr>
                                      <td className="modal_subject">받은 시각</td>
                                      <td>{mailItem.receivedTime}</td>
                                    </tr>
                                    <tr className="modal_mail_title">
                                      <td className="modal_content_title">제목</td>
                                      <td>{mailItem.title}</td>
                                    </tr>
                                    <tr className="modal_mail_content">
                                      <td colSpan={2}>
                                        <div>{mailItem.content}</div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  메일 조회 모달 */}
                  {/*{isOpen && (*/}
                  {/*    <div*/}
                  {/*        className="modal fade"*/}
                  {/*        id="compose-modal2"*/}
                  {/*        tabIndex="-1"*/}
                  {/*        role="dialog"*/}
                  {/*        // aria-hidden="true"*/}
                  {/*    >*/}
                  {/*      <div className="modal-wrapper">*/}
                  {/*        <div className="modal-dialog">*/}
                  {/*          <div className="modal-content">*/}
                  {/*            <div className="modal-header bg-blue">*/}
                  {/*              <button onClick={closeModal}>*/}
                  {/*                ×*/}
                  {/*              </button>*/}
                  {/*            </div>*/}
                  {/*          </div>*/}
                  {/*        </div>*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*)}*/}
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
