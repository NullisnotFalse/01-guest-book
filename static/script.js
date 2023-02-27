    $(document).ready(function () {
        set_temp()
        show_comment()
    });

    function set_temp() {
        $.ajax({
            type: "GET",
            url: "http://spartacodingclub.shop/sparta_api/weather/seoul",
            data: {},
            success: function (response) {
                let temp = response['temp']

                let temp_html = `<span id="temp">${temp}</span>`
                $('#temp').append(temp_html)
            }
        })
    }


    function save_comment() {
        let name = $('#name').val()
        let comment = $('#comment').val()
        let password = $('#password').val().trim()

        if (name.trim() == '') {
            alert('닉네임을 입력해주세요.')
        } else if (comment.trim() == '') {
            alert('댓글을 입력해주세요.')
        } else if (password.trim() == '') {
            alert('비밀번호를 입력해주세요.')
        } else {
            $.ajax({
                type: 'POST',
                url: '/homework',
                data: {name_give: name, comment_give: comment, password_give: password},
                success: function (response) {
                    alert(response['msg'])
                    window.location.reload()
                }
            });
        }
    }

    function show_comment() {
        $.ajax({
            type: "GET",
            url: "/homework",
            data: {},
            success: function (response) {
                let rows = response['comment_list']
                for (let i = 0; i < rows.length; i++) {
                    let name = rows[i]['name']
                    let comment = rows[i]['comment']
                    let _id = rows[i]['_id']
                    let time = rows[i]['time']

                    let temp_html = `<div class="card">
                                                 <div class="card-body">
                                                     <blockquote class="blockquote mb-0">
                                                         <p>${comment}<span class="time">(${time})</span></p>
                                                         <footer class="blockquote-footer">${name}</footer>
                                                         <div class="pw_check_box">
                                                             <div class="col-auto" id="pw_check_input_box${i}">
                                                                 <label for="inputPassword2" class="visually-hidden">Password</label>
                                                                 <input type="password" class="form-control" id="pw_check${i}" placeholder="비밀번호 입력" onkeydown="if (event.keyCode == 32) return false;">
                                                             </div>
                                                             <div id="delete_btn${i}">
                                                                 <button type="button" class="btn delete_btn" id="${i}" name="${_id}">삭제</button>
                                                             </div>
                                                         </div>
                                                     </blockquote>
                                                 </div>
                                             </div>`
                    $('#comment_list').prepend(temp_html)

                    update_delete_btn_handlers()
                }
            }
        });
    }

    function open_box() {
        $('#comment_box').show()
        $('#title_box3-2').empty()
        let temp_html = `<button onclick="close_box()" type="button" class="btn btn-outline-light">응원 댓글 닫기</button>`
        $('#title_box3-2').append(temp_html)
    }

    function close_box() {
        $('#comment_box').hide()
        $('#title_box3-2').empty()
        let temp_html = `<button onclick="open_box()" type="button" class="btn btn-outline-light">응원 댓글 남기기</button>`
        $('#title_box3-2').append(temp_html)
    }

    function open_temp() {
        $('#temp').empty()
        set_temp()
        $('#temp_txt').show()
        $('#title_box3-3').empty()

        setTimeout(function () {
            let temp_html = `<button onclick="close_temp()" type="button" class="btn btn-outline-light"><span>온도 닫기</span></button>`
            $('#title_box3-3').append(temp_html)
        }, 1000)
    }

    function close_temp() {
        $('#temp_txt').hide()
        $('#title_box3-3').empty()
        let temp_html = `<button onclick="open_temp()" type="button" class="btn btn-outline-light"><span>온도 보기</span></button>`
        $('#title_box3-3').append(temp_html)
    }

    function open_player() {
        $('#player').show()
        $('#title_box3-1').empty()
        let temp_html = `<button onclick="close_player()" type="button" class="btn btn-outline-light"><span>영상 닫기</span></button>`
        $('#title_box3-1').append(temp_html)
    }

    function close_player() {
        $('#player').hide()
        $('#title_box3-1').empty()
        let temp_html = `<button onclick="open_player()" type="button" class="btn btn-outline-light"><span>영상 보기</span></button>`
        $('#title_box3-1').append(temp_html)
    }

    $('#comment_list').on('click', '.delete_btn', function () {
        let num = this.id
        let _id = this.name

        let pw_check_input_box_id = 'pw_check_input_box' + num
        $('#' + pw_check_input_box_id).show()

        let delete_btn_id = 'delete_btn' + num
        $('#' + delete_btn_id).empty()
        let temp_html = `<button type="button" class="btn check_btn" id="${num}" name="${_id}">확인</button>`
        $('#' + delete_btn_id).append(temp_html)

        update_check_btn_handlers()
    })
    $('#comment_list').on('click', '.check_btn', function () {
        let num = this.id
        let _id = this.name

        let pw_check_input_box_id = 'pw_check_input_box' + num
        $('#' + pw_check_input_box_id).hide()

        let delete_btn_id = 'delete_btn' + num
        $('#' + delete_btn_id).empty()
        let temp_html = `<button type="button" class="btn delete_btn" id="${num}" name="${_id}">삭제</button>`
        $('#' + delete_btn_id).append(temp_html)

        update_delete_btn_handlers()
    })

    function update_delete_btn_handlers() {
        let $delete_btns = $('#comment_list .delete_btn')
        $delete_btns.off('click').on('click', function () {
            let num = this.id
            let _id = this.name

            let pw_check_input_box_id = 'pw_check_input_box' + num
            $('#' + pw_check_input_box_id).show()

            let delete_btn_id = 'delete_btn' + num
            $('#' + delete_btn_id).empty()
            let temp_html = `<button type="button" class="btn check_btn" id="${num}" name="${_id}">확인</button>`
            $('#' + delete_btn_id).append(temp_html)

            update_check_btn_handlers()
        })
    }

    function update_check_btn_handlers() {
        let $check_btns = $('#comment_list .check_btn')
        $check_btns.off('click').on('click', function () {
            let num = this.id
            let _id = this.name

            let pw_check_input_box_id = 'pw_check_input_box' + num
            $('#' + pw_check_input_box_id).hide()

            let delete_btn_id = 'delete_btn' + num
            $('#' + delete_btn_id).empty()
            let temp_html = `<button type="button" class="btn delete_btn" id="${num}" name="${_id}">삭제</button>`
            $('#' + delete_btn_id).append(temp_html)

            update_delete_btn_handlers()

            let pw_check_id = 'pw_check' + num
            let pw_check = $('#' + pw_check_id).val()

            $.ajax({
                type: 'POST',
                url: '/homework/check',
                data: {num_give: num, pw_check_give: pw_check, _id_give: _id},
                success: function (response) {
                    alert(response['msg'])
                    if (response['reload'] == '1') {
                        window.location.reload()
                    }
                }
            });
        })
    }

    function update_list() {
        let update =
            '2023-02-24 20:16 업데이트 내역\n' +
            '\n' +
            '1. 가장 최근 댓글이 맨 위로 올라오도록 정렬 순서 변경\n' +
            '2. 닉네임, 댓글, 비밀번호를 공란으로 등록하지 못하도록 변경\n' +
            '3. 비밀번호를 입력할때 스페이스바를 사용하지 못하도록 변경\n' +
            '4. 댓글 작성시 댓글카드에 작성시간을 표시하도록 변경'
        alert(update)
    }

