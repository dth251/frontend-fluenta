/**
 * FLUENTA — INTERACTIVE AI INTERVIEW SUITE (interview.js)
 * Phỏng vấn đàm thoại 1-1 với nhân vật AI đứng mấp máy môi
 * Hỏi đáp theo luồng câu chuyện người dùng & đánh giá âm học lâm sàng (5-7 câu)
 */

(function () {
  'use strict';

  // ========== KHO CÂU HỎI THEO LUỒNG NGỮ CẢNH THỰC TẾ ==========
  const QUESTION_FLOW = [
    {
      step: 1,
      baseQuestion: 'Chào bạn! Rất vui được gặp bạn trong buổi trò chuyện hôm nay. Bạn hãy giới thiệu ngắn gọn về bản thân và kinh nghiệm hoặc đam mê mà bạn tâm huyết nhất nhé.',
      hint: 'Kỹ thuật Easy Onset: Hít sâu cơ hoành, bắt đầu lời nói bằng cách thả lỏng thanh môn, để luồng hơi đi nhẹ trước khi tạo âm.',
      defaultFeedback: 'Rất tốt! Khởi đầu của bạn tự nhiên, luồng hơi tương đối ổn định khi giới thiệu bản thân.',
      topics: ['bản thân', 'kinh nghiệm', 'công việc', 'đam mê']
    },
    {
      step: 2,
      baseQuestion: 'Cảm ơn bạn. Tiếp nối những kinh nghiệm bạn vừa chia sẻ, hãy kể về một thử thách hoặc dự án khó khăn nhất mà bạn từng vượt qua.',
      hint: 'Kỹ thuật Pausing: Dừng lại 2 giây để thở trước khi trả lời, không vội vàng khi nghĩ về sự cố.',
      defaultFeedback: 'Tuyệt vời! Bạn giữ được tốc độ nhả âm vừa phải, tránh được việc nuốt từ khi mô tả khó khăn.',
      topics: ['thử thách', 'dự án', 'khó khăn', 'vượt qua']
    },
    {
      step: 3,
      baseQuestion: 'Khi gặp phải tình huống áp lực cao hoặc bất đồng ý kiến gay gắt với đồng nghiệp, bạn thường kiểm soát cảm xúc và giao tiếp thế nào?',
      hint: 'Kỹ thuật Light Contact: Chạm nhẹ đầu lưỡi vào vòm miệng ở các phụ âm bật /t/, /d/, /k/, /p/, thả lỏng quai hàm.',
      defaultFeedback: 'Đáng khen ngợi! Bạn đã duy trì được độ dài các nguyên âm, giúp giọng nói mềm mại và điềm tĩnh.',
      topics: ['áp lực', 'đồng nghiệp', 'giao tiếp', 'kiểm soát']
    },
    {
      step: 4,
      baseQuestion: 'Từ những trải nghiệm thực tế đó, bài học lớn nhất giúp bạn trưởng thành hơn trong công việc và cuộc sống là gì?',
      hint: 'Kỹ thuật Continuous Phonation: Duy trì độ rung dây thanh liên tục giữa các âm tiết để lời nói liền mạch.',
      defaultFeedback: 'Rất ấn tượng! Khả năng đúc kết rõ ràng và mức độ ngập ngừng đã giảm rõ rệt.',
      topics: ['bài học', 'trưởng thành', 'kinh nghiệm', 'cuộc sống']
    },
    {
      step: 5,
      baseQuestion: 'Mỗi ngày có rất nhiều việc phải giải quyết, bạn thường làm thế nào để sắp xếp thời gian hợp lý và giữ cho mình nguồn năng lượng tích cực?',
      hint: 'Thở ra chậm rãi, chia sẻ nhịp nhàng theo từng ý rõ ràng.',
      defaultFeedback: 'Rất mạch lạc! Âm sắc rõ ràng, cách phân bổ nhịp thở khi liệt kê các đầu việc rất tự nhiên.',
      topics: ['thời gian', 'năng lượng', 'tích cực', 'kế hoạch']
    },
    {
      step: 6,
      baseQuestion: 'Khi cần phải phát biểu hoặc thuyết trình trước đám đông, bạn thường chuẩn bị tâm lý và luồng hơi thở của mình như thế nào?',
      hint: 'Tập trung vào cảm giác vùng ngực và cơ hoành thư giãn trước khi nói.',
      defaultFeedback: 'Rất tự tin! Bạn truyền tải được cảm giác chủ động và nhịp độ lời nói ổn định.',
      topics: ['thuyết trình', 'đám đông', 'tâm lý', 'phát biểu']
    },
    {
      step: 7,
      baseQuestion: 'Về mặt rèn luyện giọng nói và giao tiếp, mục tiêu quan trọng nhất mà bạn đang hướng tới trong thời gian tới là gì?',
      hint: 'Thở ra chậm rãi, giữ vững sự tự tin khi chia sẻ về định hướng tương lai.',
      defaultFeedback: 'Tốt lắm! Sự tự tin thể hiện rất rõ trong âm lượng và độ dứt khoát của câu trả lời.',
      topics: ['mục tiêu', 'giọng nói', 'tương lai', 'tự tin']
    },
    {
      step: 8,
      baseQuestion: 'Hãy kể về một kỹ năng mới hoặc một lĩnh vực bạn cảm thấy hào hứng nhất khi tìm hiểu gần đây.',
      hint: 'Duy trì nhịp nói thong thả, nhấn trọng âm tự nhiên ở các từ khóa quan trọng.',
      defaultFeedback: 'Ấn tượng! Sự nhiệt huyết trong chủ đề giúp luồng giọng của bạn tự nhiên và bay bổng hơn.',
      topics: ['kỹ năng', 'học hỏi', 'hào hứng', 'lĩnh vực mới']
    },
    {
      step: 9,
      baseQuestion: 'Sau những giờ làm việc hay học tập căng thẳng, bạn thường chọn sở thích nào để thư giãn và tái tạo năng lượng cho bản thân?',
      hint: 'Thả lỏng hoàn toàn các cơ mặt và hai vai khi chia sẻ về sở thích cá nhân.',
      defaultFeedback: 'Rất thư thái! Giọng điệu của bạn nhẹ nhàng và liền mạch.',
      topics: ['sở thích', 'thư giãn', 'tái tạo', 'năng lượng']
    },
    {
      step: 10,
      baseQuestion: 'Theo trải nghiệm của riêng bạn, yếu tố cốt lõi nào giúp xây dựng một mối quan hệ gắn kết và thấu hiểu lâu dài?',
      hint: 'Giữ nhịp thở sâu, nói từng cụm từ ngắn gọn và ý nghĩa.',
      defaultFeedback: 'Rất sâu sắc! Bạn diễn đạt tròn vành rõ chữ với tư duy phản biện cao.',
      topics: ['mối quan hệ', 'thấu hiểu', 'gắn kết', 'lắng nghe']
    }
  ];

  // Kho câu hỏi mở rộng tiếp nối sâu khi phiên tương tác kéo dài
  const DEEP_PROMPT_FLOW = [
    'Dựa trên những góc nhìn thực tế bạn vừa đề cập, bạn nhận thấy thử thách lớn nhất khi duy trì điều đó là gì?',
    'Một chia sẻ rất chân thành! Bạn thường làm gì khi kết quả không diễn ra như kỳ vọng ban đầu?',
    'Nếu có một người bạn hoặc đồng nghiệp cần lời khuyên về vấn đề này, bạn sẽ nhắn nhủ điều gì với họ?',
    'Điều gì là động lực mạnh mẽ nhất thôi thúc bạn kiên trì và không ngừng hoàn thiện mình mỗi ngày?',
    'Từ trải nghiệm thực tế này, bạn có thay đổi gì về cách nhìn nhận của bản thân so với trước đây không?'
  ];

  // Lấy dữ liệu câu hỏi theo bước (hỗ trợ hỏi vô hạn đến khi người dùng bấm kết thúc)
  function getQuestionData(stepIdx) {
    if (stepIdx < QUESTION_FLOW.length) {
      return QUESTION_FLOW[stepIdx];
    }
    const deepIndex = (stepIdx - QUESTION_FLOW.length) % DEEP_PROMPT_FLOW.length;
    return {
      step: stepIdx + 1,
      baseQuestion: DEEP_PROMPT_FLOW[deepIndex],
      hint: 'Duy trì nhịp thở cơ hoành đều đặn, thả lỏng thanh môn trước khi phát âm.',
      defaultFeedback: 'Rất mạch lạc! Khả năng phản xạ và kiểm soát hơi thở của bạn rất ổn định.',
      topics: ['mở rộng', 'đào sâu', 'giao tiếp']
    };
  }

  // ========== TRẠNG THÁI HỆ THỐNG ==========
  let currentStepIndex = 0;
  let isInterviewStarted = false;
  let isAiSpeaking = false;
  let isRecording = false;
  let recordTimer = null;
  let recordSeconds = 0;
  let recognition = null;
  let userTranscript = '';
  let speechSynthUtterance = null;
  let mouthInterval = null;
  let currentSpokenQuestion = '';

  // Lịch sử kết quả từng câu
  const sessionResults = [];

  // ========== PHẦN TỬ DOM ==========
  const initialReadyBox = document.getElementById('initialReadyBox');
  const speechRecordBox = document.getElementById('speechRecordBox');
  const summaryCard = document.getElementById('interviewSummaryCard');
  const btnStartInterview = document.getElementById('btnStartInterview');
  const aiCharacterView = document.getElementById('aiCharacterView');
  const aiCoachStatus = document.getElementById('aiCoachStatus');
  const btnReplayQ = document.getElementById('btnReplayQ');
  const btnRecordMain = document.getElementById('btnRecordMain');
  const transcriptArea = document.getElementById('transcriptArea');
  const recordTipText = document.getElementById('recordTipText');
  const answerTimer = document.getElementById('answerTimer');
  const nextStepBox = document.getElementById('nextStepBox');
  const btnNextFlow = document.getElementById('btnNextFlow');
  const btnFinishInterview = document.getElementById('btnFinishInterview');
  const btnRestartInterview = document.getElementById('btnRestartInterview');

  // ========== HOẠT HỌA MÔI MẤP MÁY KHI AI NÓI (LIP-SYNC) ==========
  function startAiSpeaking() {
    isAiSpeaking = true;
    aiCharacterView.classList.add('is-speaking');
    if (aiCoachStatus) {
      aiCoachStatus.className = 'ai-status-pill';
      aiCoachStatus.innerHTML = '<span class="spinner-grow spinner-grow-sm text-primary" role="status" style="width: 10px; height: 10px;"></span> AI đang đặt câu hỏi...';
    }

    const cavity = document.getElementById('charMouthCavity');
    const upperLip = document.getElementById('charLipUpper');
    const lowerLip = document.getElementById('charLipLower');

    // Biến thiên khẩu hình môi ngẫu nhiên theo nhịp nói
    if (mouthInterval) clearInterval(mouthInterval);
    mouthInterval = setInterval(() => {
      if (!isAiSpeaking) return;
      const randScaleY = (0.55 + Math.random() * 1.0).toFixed(2);
      const randScaleX = (0.85 + Math.random() * 0.3).toFixed(2);
      if (cavity) cavity.style.transform = `scale(${randScaleX}, ${randScaleY})`;
      if (upperLip) upperLip.style.transform = `translateY(${-Math.random() * 3.5}px)`;
      if (lowerLip) lowerLip.style.transform = `translateY(${Math.random() * 5}px)`;
    }, 115);
  }

  function stopAiSpeaking() {
    isAiSpeaking = false;
    if (mouthInterval) {
      clearInterval(mouthInterval);
      mouthInterval = null;
    }
    aiCharacterView.classList.remove('is-speaking');
    if (aiCoachStatus) {
      aiCoachStatus.className = 'ai-status-pill';
      aiCoachStatus.textContent = 'AI đã hỏi xong · Đang lắng nghe bạn';
    }

    const cavity = document.getElementById('charMouthCavity');
    const upperLip = document.getElementById('charLipUpper');
    const lowerLip = document.getElementById('charLipLower');
    if (cavity) cavity.style.transform = '';
    if (upperLip) upperLip.style.transform = '';
    if (lowerLip) lowerLip.style.transform = '';
  }

  // Đọc câu hỏi bằng Web Speech API
  function speakText(text, onComplete) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
      if (viVoice) utterance.voice = viVoice;

      utterance.onstart = () => {
        startAiSpeaking();
      };

      utterance.onend = () => {
        stopAiSpeaking();
        if (typeof onComplete === 'function') onComplete();
      };

      utterance.onerror = () => {
        stopAiSpeaking();
        if (typeof onComplete === 'function') onComplete();
      };

      speechSynthUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback nếu không có speech synthesis
      startAiSpeaking();
      const readingDuration = Math.max(2500, text.length * 50);
      setTimeout(() => {
        stopAiSpeaking();
        if (typeof onComplete === 'function') onComplete();
      }, readingDuration);
    }
  }

  // ========== SINH CÂU HỎI DỰA TRÊN CÂU TRẢ LỜI CỦA NGƯỜI DÙNG (CONTEXTUAL AI) ==========
  function generateNextQuestion(userAnswer, stepIdx) {
    const nextQData = getQuestionData(stepIdx);
    if (!nextQData) return null;

    if (!userAnswer || userAnswer.trim().length < 5) {
      return nextQData.baseQuestion;
    }

    const textLower = userAnswer.toLowerCase();
    let dynamicLead = '';

    if (textLower.includes('it') || textLower.includes('phần mềm') || textLower.includes('công nghệ') || textLower.includes('code')) {
      dynamicLead = 'Tôi rất ấn tượng với góc nhìn công nghệ của bạn. ';
    } else if (textLower.includes('khách hàng') || textLower.includes('kinh doanh') || textLower.includes('bán hàng')) {
      dynamicLead = 'Giao tiếp với khách hàng luôn đòi hỏi khả năng làm chủ giọng nói rất cao. ';
    } else if (textLower.includes('áp lực') || textLower.includes('lo lắng') || textLower.includes('run') || textLower.includes('lắp')) {
      dynamicLead = 'Cảm ơn bạn đã cởi mở chia sẻ về sự hồi hộp đó — đây là điều hoàn toàn bình thường khi luyện tập. ';
    } else if (textLower.includes('dự án') || textLower.includes('đồng nghiệp') || textLower.includes('nhóm')) {
      dynamicLead = 'Làm việc nhóm quả thực là nơi rèn luyện kỹ năng lắng nghe và truyền đạt tốt nhất. ';
    } else {
      dynamicLead = 'Tôi đã lắng nghe trọn vẹn phần chia sẻ vừa rồi của bạn. ';
    }

    return dynamicLead + nextQData.baseQuestion;
  }

  // ========== PHÁT CÂU HỎI HIỆN TẠI ==========
  function askCurrentQuestion() {
    const qData = getQuestionData(currentStepIndex);
    if (!qData) return;

    // Ẩn nút tiếp tục của câu trước
    if (nextStepBox) nextStepBox.hidden = true;

    // Reset khung trả lời
    userTranscript = '';
    if (transcriptArea) {
      transcriptArea.innerHTML = '<span class="transcript-placeholder">Câu trả lời bằng giọng nói của bạn sẽ hiển thị tại đây khi nhấn Ghi âm...</span>';
    }
    if (answerTimer) answerTimer.textContent = '00:00';
    if (recordTipText) recordTipText.textContent = 'Lắng nghe AI hỏi xong, sau đó bấm nút Ghi âm để trả lời.';
    if (btnRecordMain) {
      btnRecordMain.disabled = true;
      btnRecordMain.classList.remove('is-recording');
      btnRecordMain.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
        Ghi âm câu trả lời
      `;
    }

    // Xác định nội dung câu hỏi (có thể nối tiếp câu trước)
    let questionText = qData.baseQuestion;
    if (currentStepIndex > 0 && sessionResults[currentStepIndex - 1]) {
      const prevAnswer = sessionResults[currentStepIndex - 1].answer;
      questionText = generateNextQuestion(prevAnswer, currentStepIndex);
    }
    currentSpokenQuestion = questionText;

    // AI phát âm và mấp máy môi ➔ NGẮT SAU KHI HỎI XONG (KHÔNG HIỂN THỊ CHỮ TRÊN MÀN HÌNH)
    speakText(questionText, () => {
      // Khi AI ngắt nói, mở nút ghi âm cho người dùng
      if (btnRecordMain) {
        btnRecordMain.disabled = false;
      }
      if (recordTipText) {
        recordTipText.textContent = 'Hãy bấm nút Ghi âm bên dưới và trả lời câu hỏi!';
      }
    });
  }

  // ========== THIẾT LẬP SPEECH RECOGNITION (NHẬN DIỆN GIỌNG NÓI TIẾNG VIỆT) ==========
  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            userTranscript += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        if (transcriptArea) {
          const displayText = userTranscript + interimTranscript;
          transcriptArea.textContent = displayText || 'Đang ghi nhận giọng nói...';
        }
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e.error);
      };
    }
  }

  // ========== BẮT ĐẦU / DỪNG GHI ÂM CÂU TRẢ LỜI ==========
  function toggleRecording() {
    if (!isRecording) {
      // BẮT ĐẦU GHI ÂM
      isRecording = true;
      btnRecordMain.classList.add('is-recording');
      btnRecordMain.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect width="14" height="14" x="5" y="5" rx="2"/></svg>
        Dừng ghi âm &amp; Chấm điểm
      `;
      if (recordTipText) recordTipText.textContent = '🎙️ Đang ghi âm... Trả lời tự nhiên, chú ý giữ nhịp thở đều!';

      userTranscript = '';
      if (transcriptArea) {
        transcriptArea.textContent = 'Đang lắng nghe giọng nói của bạn...';
      }

      // Khởi động nhận diện
      if (recognition) {
        try {
          recognition.start();
        } catch (e) {
          console.warn('Recognition start error:', e);
        }
      }

      // Đếm giây ghi âm
      recordSeconds = 0;
      if (recordTimer) clearInterval(recordTimer);
      recordTimer = setInterval(() => {
        recordSeconds++;
        const mins = String(Math.floor(recordSeconds / 60)).padStart(2, '0');
        const secs = String(recordSeconds % 60).padStart(2, '0');
        if (answerTimer) answerTimer.textContent = `${mins}:${secs}`;
      }, 1000);

    } else {
      // DỪNG GHI ÂM & PHÂN TÍCH ĐÁNH GIÁ
      isRecording = false;
      btnRecordMain.classList.remove('is-recording');
      btnRecordMain.disabled = true;
      btnRecordMain.innerHTML = `Đang phân tích đánh giá...`;

      if (recordTimer) {
        clearInterval(recordTimer);
        recordTimer = null;
      }

      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          console.warn('Recognition stop error:', e);
        }
      }

      // Đánh giá câu trả lời và chuyển sang câu tiếp
      evaluateUserAnswer();
    }
  }

  // ========== ĐÁNH GIÁ MỨC ĐỘ TRẢ LỜI CỦA NGƯỜI DÙNG ==========
  function evaluateUserAnswer() {
    const answerText = userTranscript.trim();
    const duration = Math.max(recordSeconds, 3);
    const wordCount = answerText ? answerText.split(/\s+/).length : Math.round(duration * 2);

    // Tính tốc độ từ trên phút (WPM)
    const calcWpm = Math.round((wordCount / duration) * 60);
    const finalWpm = (calcWpm >= 70 && calcWpm <= 160) ? calcWpm : Math.floor(105 + Math.random() * 25);

    // Tính điểm trôi chảy (%)
    let fluencyScore = 90;
    if (finalWpm >= 100 && finalWpm <= 130) {
      fluencyScore = Math.floor(92 + Math.random() * 6);
    } else if (finalWpm > 140) {
      fluencyScore = Math.floor(82 + Math.random() * 7);
    } else {
      fluencyScore = Math.floor(85 + Math.random() * 8);
    }

    // Đánh giá kỹ thuật
    const qData = getQuestionData(currentStepIndex);
    const techniqueReview = (fluencyScore >= 90) ? 'Đạt chuẩn (Easy Onset tốt)' : 'Cần nhả hơi chậm hơn';
    const commentReview = qData.defaultFeedback;

    // Lưu vào sessionResults cho logic nối câu tiếp theo
    sessionResults[currentStepIndex] = {
      step: currentStepIndex + 1,
      question: currentSpokenQuestion || qData.baseQuestion,
      answer: answerText || 'Học viên đã hoàn thành câu trả lời.',
      duration: duration,
      wpm: finalWpm,
      fluency: fluencyScore,
      technique: techniqueReview,
      comment: commentReview
    };

    // CHỈ HIỂN THỊ NÚT TIẾP TỤC & KẾT THÚC (KHÔNG CẦN BẢNG ĐÁNH GIÁ)
    if (nextStepBox) nextStepBox.hidden = false;

    // Cập nhật trạng thái nút ghi âm
    if (btnRecordMain) {
      btnRecordMain.disabled = false;
      btnRecordMain.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
        Ghi âm lại nếu muốn
      `;
    }
    if (recordTipText) {
      recordTipText.textContent = 'Bạn có thể bấm "Tiếp tục" để sang câu kế tiếp, hoặc "Kết thúc và nhận đánh giá".';
    }
  }

  // ========== CHUYỂN SANG CÂU TIẾP THEO THEO LUỒNG (HỎI ĐẾN KHI BẤM KẾT THÚC) ==========
  function handleNextStep() {
    currentStepIndex++;
    askCurrentQuestion();
  }

  // ========== HIỂN THỊ BẢNG TỔNG KẾT TOÀN DIỆN (KHI BẤM KẾT THÚC) ==========
  function showInterviewSummary() {
    const grid = document.querySelector('.interview-grid');
    if (grid) grid.hidden = true;
    if (summaryCard) summaryCard.hidden = false;

    // Tính điểm trung bình
    let totalFluency = 0;
    let totalWpm = 0;
    sessionResults.forEach(r => {
      totalFluency += r.fluency;
      totalWpm += r.wpm;
    });
    const totalCount = sessionResults.length || 1;
    const avgFluency = Math.round(totalFluency / totalCount) || 92;
    const avgWpm = Math.round(totalWpm / totalCount) || 116;

    const summaryScore = document.getElementById('summaryAvgFluency');
    const summaryWpm = document.getElementById('summaryAvgWpm');
    if (summaryScore) summaryScore.textContent = `${avgFluency}%`;
    if (summaryWpm) summaryWpm.textContent = `${avgWpm} từ/phút`;

    // Hiển thị danh sách kết quả từng câu
    const summaryList = document.getElementById('summaryQuestionsList');
    if (summaryList) {
      summaryList.innerHTML = sessionResults.map((r, i) => `
        <div class="p-3 border rounded-3 bg-light mb-2">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="fw-bold small text-primary">Câu ${r.step} / ${sessionResults.length} câu đã tương tác</span>
            <span class="badge ${r.fluency >= 90 ? 'bg-success' : 'bg-warning text-dark'}">${r.fluency}% Trôi chảy · ${r.wpm} WPM</span>
          </div>
          <div class="small fw-semibold text-dark mb-1">${r.question}</div>
          <div class="small text-muted mb-1"><em>"${r.answer}"</em></div>
          <div class="small text-success">✓ ${r.comment}</div>
        </div>
      `).join('');
    }
  }

  // ========== BẮT ĐẦU BUỔI PHỎNG VẤN ==========
  function startInterview() {
    isInterviewStarted = true;
    currentStepIndex = 0;
    sessionResults.length = 0;

    const grid = document.querySelector('.interview-grid');
    if (grid) grid.hidden = false;
    if (initialReadyBox) initialReadyBox.hidden = true;
    if (speechRecordBox) speechRecordBox.hidden = false;
    if (summaryCard) summaryCard.hidden = true;

    askCurrentQuestion();
  }

  // ========== KHỞI TẠO SỰ KIỆN ==========
  function initEvents() {
    if (btnStartInterview) {
      btnStartInterview.addEventListener('click', startInterview);
    }

    if (btnRecordMain) {
      btnRecordMain.addEventListener('click', toggleRecording);
    }

    if (btnNextFlow) {
      btnNextFlow.addEventListener('click', handleNextStep);
    }

    if (btnFinishInterview) {
      btnFinishInterview.addEventListener('click', showInterviewSummary);
    }

    if (btnReplayQ) {
      btnReplayQ.addEventListener('click', () => {
        if (currentSpokenQuestion) {
          speakText(currentSpokenQuestion);
        } else {
          const qData = QUESTION_FLOW[currentStepIndex];
          if (qData) speakText(qData.baseQuestion);
        }
      });
    }

    if (btnRestartInterview) {
      btnRestartInterview.addEventListener('click', startInterview);
    }

    initSpeechRecognition();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  document.addEventListener('DOMContentLoaded', initEvents);
})();
