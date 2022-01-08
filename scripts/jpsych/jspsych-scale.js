/*
 * Example plugin template
 */

jsPsych.plugins['jspsych-scale'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'jspsych-scale',
        parameters: {
            askStrategy: {
                type: jsPsych.plugins.parameterType.BOOLEAN,
                default: true
            }
        }
    };

    plugin.trial = function (display_element, trial) {
        var technicalExpanded = false;
        // clear display element and apply page default styles
        display_element.innerHTML = '';
        $('body')
            .css('height', 'auto')
            .css('background-color', 'black')
            .css('overflow', 'auto');
        $.scrollify.destroy();

        // make sure page starts at the top every time
        removeHash();
        removeQueryString();
        scrollTop();

        var options = 10;

        /* change these parameters to adjust the survey matrix appearance (CSS) */
        var containerWidth = 50;
        var quarterContainerWidth = 0.25 * containerWidth;
        var questionWidth = containerWidth;
        var opterWidth = containerWidth;
        var optionWidth = opterWidth / options;
        var questionHeight = 20;
        var doubleQuestionHeight = 2 * questionHeight;
        var questions = [];

        document.body.style.setProperty('--containerWidth', containerWidth + 'vw');
        document.body.style.setProperty('--quarterContainerWidth', quarterContainerWidth + 'vw');
        document.body.style.setProperty('--questionWidth', questionWidth + 'vw');
        document.body.style.setProperty('--opterWidth', opterWidth + 'vw');
        document.body.style.setProperty('--optionWidth', optionWidth + 'vw');
        document.body.style.setProperty('--questionHeight', questionHeight + 'vh');
        document.body.style.setProperty('--doubleQuestionHeight', doubleQuestionHeight + 'vh');

        var container = createGeneral(
            container,
            display_element,
            'div',
            '',
            'feedback-container',
            ''
        );

        if (scaleUsed == "BIG5") {

            questions = [
                '...is talkative',
                '...tends to find fault with others',
                '...does a thorough job',
                '...is depressed, blue',
                '...is original, comes up with new ideas',
                '...is reserved',
                '...is helpful and unselfish with others',
                '...can be somewhat careless',
                '...is relaxed, handles stress well',
                '...is curious about many different things',
                '...is full of energy',
                '...starts quarrels with others',
                '...is a reliable worker',
                '...can be tense',
                '...is ingenious, a deep thinker',
                '...generates a lot of enthusiasm',
                '...has a forgiving nature',
                '...tends to be disorganised',
                '...worries a lot',
                '...has an active imagination',
                '...tends to be quiet',
                '...is generally trusting',
                '...tends to be lazy',
                '...is emotionally stable, not easily upset',
                '...is inventive',
                '...has an assertive personality',
                '...can be cold and aloof',
                '...perseveres until the task is finished',
                '...can be moody',
                '...values artistic, aesthetic experiences',
                '...is sometimes shy, inhibited',
                '...is considerate and kind to almost everyone',
                '...does things efficiently',
                '...remains calm in tense situations',
                '...prefers work that is routine',
                '...is outgoing, sociable',
                '...is sometimes rude to others',
                '...makes plans and follows through with them',
                '...gets nervous easily',
                '...likes to reflect, play with ideas',
                '...has few artistic interests',
                '...likes to cooperate with others',
                '...is easily distracted',
                '...is sophisticated in art, music, or literature'
            ];

            var header = createGeneral(
                header,
                container,
                'div',
                'question',
                'feedback-title',
                '<h2>Lastly, please indicate to what extent the following statements apply to you. If you cannot continue, please make sure that you have responded to all items.<br><br>I see myself as someone who...</h2>'
            );

            var feedbackPoll = createGeneral(
                feedbackPoll,
                container,
                'div',
                'surveyMatrix centered-poll',
                'feedbackPoll',
                ''
            );

            createSurveyMatrix(
                feedbackPoll,
                '',
                'BIG5',
                questions,
                ['1<br>disagree strongly', '2<br>disagree a little', '3<br>neither agree nor disagree', '4<br>agree a little', '5<br>agree strongly']
            );
        } else {

            questions = [
                'I am easily influenced by other people’s opinions',
                'I can be influenced by a good commercial',
                'When someone coughs or sneezes, I usually feel the urge to do the same',
                'Imagining a refreshing drink can make me thirsty',
                'A good salesperson can really make me want their product',
                'I get a lot of good practical advice from magazines or TV',
                'If a product is nicely displayed, I usually want to buy it',
                'When I see someone shiver, I often feel a chill myself',
                'I get my style from certain celebrities',
                'When people tell me how they feel, I often notice that I feel the same way',
                'When making a decision, I often follow other people’s advice',
                'Reading descriptions of tasty dishes can make my mouth water',
                'I get many good ideas from others',
                'I frequently change my opinion after talking with others',
                'After I see a commercial for lotion, sometimes my skin feels dry',
                'I discovered many of my favorite things through my friends',
                'I follow current fashion trends',
                'Thinking about something scary can make my heart pound',
                'I have picked-up many habits from my friends',
                'If I am told I don’t look well, I start feeling ill',
                'It is important for me to fit in'
            ];

            var header = createGeneral(
                header,
                container,
                'div',
                'question',
                'feedback-title',
                '<h2>Lastly, please indicate to what extent the following statements apply to you. If you cannot continue, please make sure that you have responded to all items.</h2>'
            );

            var feedbackPoll = createGeneral(
                feedbackPoll,
                container,
                'div',
                'surveyMatrix centered-poll',
                'feedbackPoll',
                ''
            );

            createSurveyMatrix(
                feedbackPoll,
                '',
                'short-MISS',
                questions,
                ['1<br>not at all<br>or very slightly', '2<br>a little', '3<br>somewhat', '4<br>quite a bit', '5<br>a lot']
            );
        }


        $('#jspsych-content').on('click', '#feedbackPoll .surveyMatrix-option', function () {
            var name = $(this).children('input').attr('name');
            var value = $(this).children('input').prop('value');
            dataObject[name] = value;
        });

        var continueButton = createGeneral(
            continueButton,
            container,
            'button',
            'default-green-button',
            'feedback-continue-button',
            'CONTINUE'
        );

        continueButton.onclick = function () {
            if ($(':checked').length == questions.length) {
                jsPsych.finishTrial();
            }
        };
    };

    return plugin;
})();
