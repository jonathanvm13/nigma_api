var question = "{\"variables\":{\"text\":\"_x = U[0, 1, 1]\\n\",\"variables\":[{\"codeFragment\":\"_x = U[0, 1, 1]\",\"name\":\"_x\",\"parameters\":{\"min\":\"0\",\"max\":\"1\",\"step\":\"1\"},\"code\":\"Variables['_x'] = 0 + Math.floor(((1 - 0) * Math.random()/1)) * 1;\",\"possibleValue\":null}]},\"answers\":[{\"name\":\"X\",\"correctValue\":\"_x + 1\",\"showLabel\":true,\"precision\":0,\"commonErrors\":[],\"_id\":\"ied9wcut\",\"code\":[\"var correctValue = Variable[\\\"_x\\\"] + 1;\",\"switch(inputValue){\",\"case correctValue:\",\"console.log(\\\"You did it!\\\");\",\"response = 'You did it!';\",\"answerError = false;\",\"break;\",\"default:\",\"response = \\\"Wrong answer!\\\";\",\"answerError = true;\",\"break;\",\"}\"]}],\"formulation\":\"No se de donde se coge esto\"}"; question = JSON.parse(question);window.question = window.question || question;