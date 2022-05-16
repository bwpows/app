// 创建上传任务
export function createUpload(files, data) {
	var task = plus.uploader.createUpload( "http://localhost:3000/publish/video",
		{ method:"POST",priority:100 },
		function ( t, status ) {
			// 上传完成
			if ( status == 200 ) {
				alert( "Upload success: " + t.url );
			} else {
				alert( "Upload failed: " + status );
			}
		}
	);
    for (let i = 0; i < files.length; i++) {
        task.addFile(files[i], { key: "file" } );
    }
    for (const key in data) {
        task.addData( key, data[key] );
    }
	task.start();
}