# Covid_Project

PTUDWEB 11– 2021
1
PROJECT Phát triển ứng dụng Web
Xây dựng ứng dụng “Quản lý thông tin Covid-19” gồm 2 hệ thống với các chức
năng sau:
1 Hệ thống Quản lý Covid
1.1 Đăng nhập, khởi tạo ban đầu
✓ Khi chương trình khởi động thì cần yêu cầu đăng nhập. Tùy thuộc vào phân
quyền của tài khoản mà mở màn hình với các chức năng thích hợp.
✓ Nếu Hệ thống khởi tạo lần đầu tiên thì cần cho phép tạo tài khoản admin.
✓ Nếu là tài khoản của Người được quản lý đã có trong hệ thống nhưng chưa
từng đăng nhập thì yêu cầu taok password.
1.2 Phân hệ Quản lý
Người quản lý được sử dụng các chức năng sau:
1.2.1 Quản lý danh sách người liên quan Covid-19
✓ Người liên quan Covid-19 bao gồm các thông tin cơ bản sau:
o Họ tên
o Số CMND / Căn cước công dân
o Năm sinh
o Địa chỉ nơi ở (Tỉnh / Thành phố, Quận / Huyện và Phường / Xã)
o Trạng thái hiện tại (F0 / F1 / F2 / F3)
o Nơi đang điều trị / cách ly (cơ sở điều trị / cách ly)
o Có liên quan với Người liên quan Covid-19 nào.
o Lịch sử quá trình được quản lý (thay đổi trạng thái, chuyển nơi điều
trị,…).
✓ Hiển thị danh sách
✓ Xem chi tiết thông tin của người liên quan bao gồm danh sách người liên
đới.
✓ Tìm kiếm
✓ Sắp xếp theo nhiều tiêu chí.
1.2.2 Thêm người liên quan Covid-19 vào hệ thống
✓ Form thêm với đầy đủ thông tin cần thiết.PTUDWEB 11– 2021
2
✓ Có validation đầy đủ.
1.2.3 Thay đổi trạng thái người liên quan Covid-19
✓ Chuyển trạng thái cần thiết như: F2 -> F1, F2 -> F0,… với các thông tin phù
hợp (người liên quan phải thay đổi trạng thái theo).
✓ Chuyển nơi điều trị / cách ly (ràng buộc về sức chứa).
1.2.4 Quản lý các sản phẩm nhu yếu phẩm
✓ Sản phẩm nhu yếu phẩm gồm các thông tin cơ bản
o Tên sản phẩm
o Hình ảnh sản phẩm (nhiều hình)
o Giá tiền
o Đơn vị định lượng
✓ Hiển thị danh sách
✓ Tìm kiếm, Sắp xếp, Lọc
✓ Thêm, xóa, sửa (luôn kiểm tra ràng buộc)
1.2.5 Quản lý các gói Nhu yếu phẩm
✓ Gói Nhu yếu phẩm gồm các thông tin cơ bản sau:
o Tên gói
o Danh sách các sản phẩm trong gói (tối thiểu 2 sản phẩm)
o Mức giới hạn số lượng mỗi sản phẩm trong gói
o Mức giới hạn gói cho mỗi người theo thời gian
o Thời gian giới hạn (ngày, tuần, tháng)
✓ Hiển thị danh sách
✓ Xem chi tiết: có thể xem chi tiết mỗi sản phẩm trong gói
✓ Tìm kiếm, sắp xếp, lọc
✓ Thêm, xóa, sửa (luôn kiểm tra ràng buộc)
1.2.6 Thống kê thông tin
✓ Thống kê số lượng người ở từng trạng thái theo thời gian.
✓ Thống kê các thông tin có thể như: số chuyển trạng thái, khỏi bệnh,…
✓ Thống kê tiêu thụ các gói Nhu yếu phẩm
✓ Thống kê tiêu thụ sản phẩm
✓ Thống kê dư nợ, thanh toán
1.2.7 Quản lý Thanh toán
✓ Thay đổi hạn mức thanh toán tối thiểuPTUDWEB 11– 2021
3
✓ Duyệt danh sách và gửi thông báo nhắc thanh toán
1.3 Phân hệ quản trị (Admin)
1.3.1 Tạo tài khoản
✓ Tạo tài khoản người quản lý với xử lý password lưu trữ hợp lý (không lưu
trữ password bản rõ trong database).
✓ Chỉ cần thông tin username, password và phân quyền.
1.3.2 Quản lý thông tin tài khoản người quản lý
✓ Khóa tài khoản.
✓ Xem lịch sử hoạt động của tài khoản.
1.3.3 Quản lý địa điểm điều trị / cách ly
✓ Thêm mới, điều chỉnh.
✓ Địa điểm điều trị / cách ly chỉ cần thông tin Tên, Sức chứa và Số lượng tiếp
nhận hiện tại.
1.4 Phân hệ người dùng (Người được quản lý)
1.4.1 Xem thông tin cá nhân
✓ Các thông tin cơ bản
✓ Lịch sử được quản lý
✓ Lịch sử tiêu thụ gói Nhu yếu phẩm
✓ Xem dư nợ
✓ Lịch sử thanh toán
✓ Thông báo nhắc thanh toán (nếu có)
1.4.2 Thay đổi thông tin cá nhân
✓ Chỉ cho thay đổi mật khẩu (quy trình hợp lý)
✓ Liên kết sang Hệ thống thanh toán để nạp tiền
1.4.3 Chọn mua gói Nhu yếu phẩm
✓ Xem danh sách các gói Nhu yếu phẩm
✓ Tìm kiếm, sắp xếp, lọc
✓ Thay đổi số lượng sản phẩm trong gói (trong phạm vi ràng buộc)
✓ Chọn mua gói Nhu yếu phẩm (có kiểm tra các ràng buộc).
1.4.4 Thanh toán chi phí
✓ Thanh toán dư nợ theo hạn mức tối thiểu (có kiểm tra số dư từ Hệ thốngPTUDWEB 11– 2021
4
Thanh toán)
✓ Liên kết sang Hệ thống thanh toán để nạp tiền
2 Hệ thống Quản lý Thanh toán
2.1 Khởi tạo hệ thống
➢ Hệ thống khởi tạo với 1 tài khoản chính để nhận thanh toán từ Người được
quản lý.
2.2 Tài khoản
➢ Tài khoản chỉ gồm ID và số dư hiện tại.
2.3 Chức năng
➢ Thiết kế database để hệ thống thực hiện được chức năng thanh toán
(chuyển khoản) từ các tài khoản Người được quản lý sang tài khoản chính.
➢ Cần có chức năng thêm tài khoản cho Người được quản lý mới (tương ứng
khi được đưa vào hệ thống quản lý).
➢ Khi người dùng đã được tạo tài khoản, đăng nhập lần đầu sẽ yêu cầu tạo
mật khẩu (có chức năng thay đổi mật khẩu với quy trình hợp lý)
➢ Chức năng nạp tiền, kiểm soát số dư
➢ Cần có giải pháp để có thể đối soát giao dịch thanh toán.
3 Liên kết hệ thống Quản lý và Thanh toán
➢ Sử dụng WebAPI
➢ Cần đề xuất quy trình hợp lý.
4 Lưu ý:
✓ Cần có sẵn ít nhất 5 Tỉnh thành, mỗi Tỉnh thành có ít nhất 5 Quận / Huyện,
mỗi Quận / Huyện có ít nhất 5 Phường / Xã (tên không cần chính xác thực
tế).
✓ Cần có sẵn ít nhất 5 điểm điều trị / cách ly.
✓ Chỉ hoàn thành đúng các chức năng được yêu cầu.
✓ Tuân thủ nghiêm ngặt các yêu cầu nộp bài (sẽ có thông báo cụ thể).
